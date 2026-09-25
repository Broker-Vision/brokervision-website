const { TableClient } = require("@azure/data-tables");
const crypto = require("crypto");

function getConnectionString() {
  return (
    process.env.CONTACT_STORAGE_CONNECTION_STRING ||
    process.env.AzureWebJobsStorage ||
    ""
  );
}

function getTableName() {
  return process.env.CONTACT_TABLE_NAME || "ContactInquiries";
}

function hashIp(ip) {
  if (!ip) return "";
  const salt = process.env.CONTACT_IP_HASH_SALT || "brokervision-contact";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

function createTableClient() {
  const connectionString = getConnectionString();
  if (!connectionString) return null;
  return TableClient.fromConnectionString(connectionString, getTableName());
}

/**
 * Persist a contact inquiry in Azure Table Storage.
 * Creates the table if it does not exist.
 */
async function saveInquiry(inquiry) {
  const client = createTableClient();
  if (!client) {
    return { ok: false, code: "STORAGE_NOT_CONFIGURED" };
  }

  await client.createTable().catch((error) => {
    if (error?.statusCode !== 409) throw error;
  });

  const received = new Date(inquiry.receivedAt || Date.now());
  const partitionKey = `${received.getUTCFullYear()}-${String(received.getUTCMonth() + 1).padStart(2, "0")}`;
  const rowKey = inquiry.id;

  const entity = {
    partitionKey,
    rowKey,
    receivedAt: inquiry.receivedAt,
    name: inquiry.name,
    company: inquiry.company || "",
    email: inquiry.email,
    phone: inquiry.phone || "",
    interest: inquiry.interest,
    message: inquiry.message,
    source: inquiry.source || "website-contact",
    status: inquiry.status || "new",
    mailStatus: inquiry.mailStatus || "pending",
    clientIpHash: inquiry.clientIpHash || "",
    turnstileOk: true,
  };

  await client.createEntity(entity);
  return { ok: true, partitionKey, rowKey };
}

/**
 * Durable rate-limit counter in table storage (multi-instance ready).
 */
async function bumpRateLimit(ipHash, windowMs) {
  const client = createTableClient();
  if (!client || !ipHash) return { ok: false };

  await client.createTable().catch((error) => {
    if (error?.statusCode !== 409) throw error;
  });

  const windowId = Math.floor(Date.now() / windowMs);
  const partitionKey = "ratelimit";
  const rowKey = `${ipHash}:${windowId}`;

  try {
    const existing = await client.getEntity(partitionKey, rowKey);
    const count = Number(existing.count || 0) + 1;
    await client.updateEntity(
      { partitionKey, rowKey, count, updatedAt: new Date().toISOString() },
      "Merge",
    );
    return { ok: true, count };
  } catch (error) {
    if (error?.statusCode === 404) {
      await client.createEntity({
        partitionKey,
        rowKey,
        count: 1,
        updatedAt: new Date().toISOString(),
      });
      return { ok: true, count: 1 };
    }
    throw error;
  }
}

module.exports = { saveInquiry, bumpRateLimit, hashIp, getConnectionString };

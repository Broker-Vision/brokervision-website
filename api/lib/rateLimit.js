/**
 * In-memory rate limiter (per instance), prepared for durable table counters.
 */

const buckets = new Map();

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"] || req.headers["X-Forwarded-For"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return (
    req.headers["x-client-ip"] ||
    req.headers["X-Client-IP"] ||
    req.headers["x-azure-clientip"] ||
    ""
  );
}

function checkRateLimit(ip, options = {}) {
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || options.windowMs || 60_000);
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX || options.max || 5);
  const key = ip || "unknown";
  const now = Date.now();

  let entry = buckets.get(key);
  if (!entry || now - entry.start >= windowMs) {
    entry = { start: now, count: 0 };
    buckets.set(key, entry);
  }

  entry.count += 1;

  // Prevent unbounded growth in long-running instances.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (now - v.start >= windowMs) buckets.delete(k);
    }
  }

  if (entry.count > max) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((windowMs - (now - entry.start)) / 1000),
      windowMs,
      max,
      count: entry.count,
    };
  }

  return { ok: true, windowMs, max, count: entry.count };
}

module.exports = { checkRateLimit, getClientIp };

/**
 * Shared HTTP helpers for Azure Functions (timeouts, safe text).
 */

function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function readBodyPreview(response, max = 2000) {
  const text = await response.text();
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

module.exports = { fetchWithTimeout, readBodyPreview };

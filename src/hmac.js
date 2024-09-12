import crypto from "node:crypto";

class HMAC {
  getRandomKey(size) {
    return crypto.randomBytes(size || 32);
  }

  getStringKey(size) {
    return this.getRandomKey(size || 32).toString("hex");
  }

  createHmac(message, key, alg) {
    const hmac = crypto.createHmac(alg || "sha256", key);
    hmac.update(message);
    return hmac.digest("hex");
  }
}

export default HMAC;

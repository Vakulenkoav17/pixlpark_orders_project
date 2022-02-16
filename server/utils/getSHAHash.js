const crypto = require("crypto");

function getSHAHash (data) {
  return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

module.exports = getSHAHash;

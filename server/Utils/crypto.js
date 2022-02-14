const crypto = require("crypto");

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
  }
  
  module.exports = sha1 

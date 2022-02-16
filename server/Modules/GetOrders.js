const axios = require("axios");
const sha1 = require("../utils/getSHAHash");

class VerificationTokenApi {
  url = "http://api.pixlpark.com/";

  publicKey = "38cd79b5f2b2486d86f562e3c43034f8";

  privateKey = "8e49ff607b1f46e1a5e8f6ad5d312a80";

  async getRequestToken() {
    try {
      const response = await axios.get(this.url + "oauth/requesttoken");
      const requestToken = response.data.RequestToken;
      return requestToken;
    } catch (error) {
      console.log(error.message);
    }
  }

  getHashedToken(requestToken) {
    const hashedToken = sha1(requestToken + this.privateKey);

    return hashedToken;
  }

  async getAccessToken(requestToken, hashedToken) {
    try {
      const response = await axios.get(this.url + "oauth/accesstoken", {
        params: {
          oauth_token: requestToken,
          grant_type: "api",
          username: this.publicKey,
          password: hashedToken,
        },
      });

      return response.data.AccessToken;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getToken() {
    const requestToken = await this.getRequestToken();
    const hashedToken = this.getHashedToken(requestToken);
    const accessToken = await this.getAccessToken(requestToken, hashedToken);

    return accessToken;
  }

  async getOrders(accessToken) {
    try {
      const response = await axios.get(this.url + "orders", {
        params: {
          oauth_token: accessToken,
          take: 10,
        },
      });

      return response.data.Result;
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = VerificationTokenApi;

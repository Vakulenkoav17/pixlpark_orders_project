const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const crypto = require("crypto");


app.use(cors());
app.options('*', cors());

function sha1(data) {
  return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

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
      console.error(error.message);
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
          take : 5
        }
      });
      
      return response.data.Result;
    } catch (error) {
      console.log(error.message);
    }
  }

}

app.get("/get-api-token", async function (req, res) {
  const api = new VerificationTokenApi();
  const token = await api.getToken();

  if (!token) {
    res.send({ error: "Some error" }).status(403);
    return;
  }

  res.send(token);
});

app.get("/get-api-orders", async function (req, res) {
  const api = new VerificationTokenApi();
  const token = await api.getToken();
  const orders = await api.getOrders(token);

  if (!token) {
    res.send({ error: "Some error" }).status(403);
    return;
  }

  res.send(orders);
});

app.listen(5000, () => {
  console.log(`server started on 5000`);
});

/**
 * Варианты
 *
 * 1. Инициализируешь VerificationTokenApi класс в бразуере, это позволит сохранить токен в браузере (localStorage)
 * 2. Ты делаешь ручки на своем сервере, чтобы зафетчить с браузера токен. Запрос browser -> localhost:5000/get-token -> VerificationTokenApi.
 * localhost:5000/get-token может вернуть токен либо в виде данных (в теле ответа, body), либо в заголовке cookie (set cookie)
 */

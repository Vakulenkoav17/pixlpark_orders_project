const express = require("express");
const app = express();

const VerificationTokenApi = require("./Modules/GetOrders");

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

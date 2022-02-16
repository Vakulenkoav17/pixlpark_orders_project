const express = require("express");
const app = express();
const cors = require("cors");

const VerificationTokenApi = require("./modules/GetOrders");

app.use(cors());
app.options('*', cors());

app.get("/get-api-orders", async function (req, res) {
  const api = new VerificationTokenApi();
  const token = await api.getToken();
  const orders = await api.getOrders(token);

  if (!token) {
    res.send({ error: "Can't get orders" }).status(403);
    return;
  }

  res.send(orders);
});

app.listen(5000, () => {
  console.log(`server started on 5000`);
});

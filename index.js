const express = require("express");

const app = express();
app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/userData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("db i not connected");
  });

const dataschema = mongoose.Schema({
  name: String,

  email: String,

  phone: String,
});

const Item = mongoose.model("Items", dataschema);

app.get("/getData", async (req, res) => {
  let data = await Item.find({});
  res.json(data);
});

app.post("/create", async (req, res) => {
  const data = new Item({
    ...req.body,
  });
  const datas = await data.save();
  res.json(datas);
});

app.listen(4000, () => {
  console.log("server is running port:4000");
});

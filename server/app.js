const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
const mongoconnect = "mongodb://trepachev:Pervil-9@localhost:27017/trtest1";
const mongoconnectoptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(mongoconnect, mongoconnectoptions);
//Роуты для "/post"
const postRouter = require("./routes/postRouter");
app.use("/post", postRouter);

app.listen(3000);

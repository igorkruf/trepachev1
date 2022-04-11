const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Роуты для "/post"
const postRouter = require("./routes/postRouter");
app.use("/post", postRouter);

app.listen(3000);

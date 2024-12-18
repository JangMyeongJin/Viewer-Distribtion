const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routers");

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(5005, () => {
  console.log("Server is running on port 5005");
});

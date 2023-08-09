const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index.js");

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/movies", routes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

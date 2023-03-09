const express = require("express");
const app = express();
const path = require('path');

const staticRoot = path.resolve(__dirname, '../public');

app.use(express.static(staticRoot));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/student", require('./api/student'));




app.use(require("./errorMiddleware"));

const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});

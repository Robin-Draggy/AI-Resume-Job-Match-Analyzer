const express = require('express');
const cors = require('cors');
const { router } = require("./routes/resume.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/resume", router);

module.exports = { app };
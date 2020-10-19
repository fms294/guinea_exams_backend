const express = require("express");
const userRouter = require('./router/user');
const subjectRouter = require('./router/subject');
require("../src/db/mongoose");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(subjectRouter);

module.exports = app;

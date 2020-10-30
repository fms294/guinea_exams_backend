const express = require("express");
const userRouter = require("./router/user");
const programRouter = require("./router/program");
const commentRouter = require("./router/comment");
const paymentRouter = require("./router/payment");
require("../src/db/mongoose");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(programRouter);
app.use(commentRouter);
app.use(paymentRouter);

module.exports = app;

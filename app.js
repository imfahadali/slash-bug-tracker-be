const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient, Prisma } = require("@prisma/client");
const cors = require("cors");

const projectRoutes = require("./routes/project");
const uploadRoutes = require("./routes/upload");
const userRoutes = require("./routes/user");
const ticketRoutes = require("./routes/ticket");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

app.use("/user", userRoutes);

app.use("/upload", uploadRoutes);

app.use("/project", projectRoutes);

app.use("/ticket", ticketRoutes);

const prisma = new PrismaClient();

module.exports = app;

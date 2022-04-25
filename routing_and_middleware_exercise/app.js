const express = require("express");
const itemsRoutes = require("./itemRoutes")
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use("/items", itemsRoutes);
app.use(morgan(dev));
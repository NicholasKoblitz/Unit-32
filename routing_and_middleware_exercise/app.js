const express = require('express');
const morgan = require("morgan");
const itemRoutes = require("./itemRoutes");

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use("/items", itemRoutes);



app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({error: {message, status}});
})


module.exports = app;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");
const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 600 * 1000, //1 minute
    max: 5,
    message:'Too many recquests form this IP. Please try again later'
})

// middleware 
app.use(rateLimiter);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route define
app.use('/api/users',userRouter);
app.use('/api/seed',seedRouter);


app.get("/test", (req, res) => {
    res.status(200).send({
        message:'api is working fine',
    })
})


// client error handling
app.use((req, res, next) => {
    // res.status(404).json({ message: 'route not found' });
    createError(404, 'route not found');
    next();
})
// server error handling
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode:err.status,
        message:err.message
    })
})


module.exports = app;
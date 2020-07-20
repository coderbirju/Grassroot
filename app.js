const express = require('express');
const app = express(); /* Spins up express to utilize different functionality */
const morgan = require('morgan') /* Used for the logging */
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

/* Configure dotnev to read the env file */
dotenv.config()

/* connect to mongoose */
mongoose.connect(
    'mongodb+srv://'+ process.env.MONGO_USER_NAME +':'+ process.env.MONGO_PASSWORD +'@cluster1-8lfza.mongodb.net/'+process.env.MONGO_DB+'?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.once('open', ()=> console.log('Connected')).on('error', (error) => {
    console.log("Error", error);
});

/* tunnulening through morgan for loggin*/
app.use(morgan('dev'));

/* Parsing and formatting the body */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Allowing cross origin */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/* Add your different api middlewares here */

/* None of the router got used */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports  = app;
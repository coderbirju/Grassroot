const express = require('express');
const app = express(); /* Spins up express to utilize different functionality */
const morgan = require('morgan') /* Used for the logging */
const bodyParser = require('body-parser')  //handling response
const mongoose = require('mongoose') // connect to db
const dotenv = require('dotenv') // Fixing env issue

const homeRoute = require('./api/routes/home_routes')
const skillRoute = require('./api/routes/skill_routes')
const projectRoute = require('./api/routes/project_routes')
const contactRoute = require('./api/routes/contact_routes')

/* Configure dotnev to read the env file */
dotenv.config()

/* connect to mongoose */
mongoose.connect(
    'mongodb+srv://'+ process.env.MONGO_USER_NAME +':'+ process.env.MONGO_PASSWORD +'@cluster1-8lfza.mongodb.net/'+process.env.MONGO_DB+'?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

/* Handle mongoDB connection */
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
app.use('/home', homeRoute);
app.use('/project', projectRoute);
app.use('/skill', skillRoute);
app.use('/contact', contactRoute);

/* None of the middleware got used it will redirect to 404 page :) */
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
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/*
This is to set the credentials environment variables in the .env file. If you set your environmental variables
elsewhere, disable / remove this.
 */
require('dotenv').config();

if(process.env.OPENLDBWSTOKEN === undefined) {
    throw new Error("OPENLDBWSTOKEN is not defined. Make sure you list it as an environment variable " +
        "either in the .env in the root of the server or in your server configurations.");
}
if(process.env.OPENLDBWSURL === undefined) {
    throw new Error("OPENLDBWSURL is not defined. Make sure you list it as an environment variable " +
        "either in the .env in the root of the server or in your server configurations.")
}

if(process.env.OPENLDBWSTYP === undefined) {
    throw new Error("OPENLDBWSTYP is not defined. Make sure you list it as an environment variable " +
        "either in the .env in the root of the server or in your server configurations.")
}

if(process.env.OPENLDBWSLDB === undefined) {
    throw new Error("OPENLDBWSLDB is not defined. Make sure you list it as an environment variable " +
        "either in the .env in the root of the server or in your server configurations.")
}


let indexRouter = require('./routes/index');
let getDepartureBoardRouter = require('./routes/getDepartureBoard');
let getDepBoardWithDetailsRouter = require('./routes/getDepBoardWithDetails');
let getArrivalBoardRouter = require('./routes/getArrivalBoard');
let getArrBoardWithDetailsRouter = require('./routes/getArrBoardWithDetails');
let getArrivalDepartureBoardRouter = require('./routes/getArrivalDepartureBoard');
let getArrDepBoardWithDetailsRouter = require('./routes/getArrDepBoardWithDetails');
let getNextDeparturesRouter = require('./routes/getNextDepartures');
let getNextDeparturesWithDetailsRouter = require('./routes/getNextDeparturesWithDetails');
let getFastestDeparturesRouter = require('./routes/getFastestDepartures');
let getFastestDeparturesWithDetailsRouter = require('./routes/getFastestDeparturesWithDetails');
let getServiceDetailsRouter = require('./routes/getServiceDetails');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/GetDepartureBoard', getDepartureBoardRouter);
app.use('/GetDepBoardWithDetails', getDepBoardWithDetailsRouter);
app.use('/GetArrivalBoard', getArrivalBoardRouter);
app.use('/GetArrBoardWithDetails', getArrBoardWithDetailsRouter);
app.use('/GetArrivalDepartureBoard', getArrivalDepartureBoardRouter);
app.use('/GetArrDepBoardWithDetails', getArrDepBoardWithDetailsRouter);
app.use('/GetNextDepartures', getNextDeparturesRouter);
app.use('/GetNextDeparturesWithDetails', getNextDeparturesWithDetailsRouter);
app.use('/GetFastestDepartures', getFastestDeparturesRouter);
app.use('/GetFastestDeparturesWithDetails', getFastestDeparturesWithDetailsRouter);
app.use('/GetServiceDetails', getServiceDetailsRouter);

module.exports = app;

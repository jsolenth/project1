/*var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/noteRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});

app.use("/", indexRoutes);
app.use(jwt( app.get("jwt-validate"))); //after this middleware a token is required!
app.use("/orders", orderRoutes);


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else
    {
        next(err);
    }
});

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;*/




const express = require('express') ;
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('express-jwt');

const noteRoutes = require('./routes/noteRoutes');

// import express from 'express';
// import bodyParser from 'body-parser';
// import path from 'path';
// import jwt from 'express-jwt';
//
// //import {indexRoutes} from './routes/indexRoutes';
// import {noteRoutes} from './routes/noteRoutes';

const app = express();

const router = express.Router();

app.use(express.static(path.resolve('public/index.html')));
app.use(express.static(path.resolve('public')));

// app.use(bodyParser.json());
// const jwtSecret = 'aklsdjfklöasjdcma8sd90mcklasdföasdf$ädasöfü pi340qkrlöam,dflöäasf';
//
// app.set("jwt-secret", jwtSecret); //secret should be in a config file - or better be a private key!
// app.set("jwt-sign", {expiresIn: "1d", audience: "self", issuer: "pizza"});
//app.set("jwt-validate", {secret: jwtSecret, audience: "self", issuer: "pizza"});


app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/index.html",  {root: __dirname + '/public/'});
});


//app.use("/", indexRoutes);
//app.use(jwt( app.get("jwt-validate"))); //after this middleware a token is required!
app.use("/", noteRoutes);


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else
    {
        next(err);
    }
});

// app.get('/', function(req, res){
//     res.render('form');// if jade
//     // You should use one of line depending on type of frontend you are with
//     res.sendFile(__dirname + '/form.html'); //if html file is root directory
//     res.sendFile("index.html"); //if html file is within public directory
// });
//
// app.post('/',function(req,res){
//     var username = req.body.username;
//     var htmlData = 'Hello:' + username;
//     res.send(htmlData);
//     console.log(htmlData);
// });

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
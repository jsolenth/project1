
const express = require('express') ;
const bodyParser = require('body-parser');
const path = require('path');
const noteRoutes = require('./routes/noteRoutes');
const app = express();
const router = express.Router();

app.use(express.static(path.resolve('public/index.html')));
app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/index.html",  {root: __dirname + '/public/'});
});

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


const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
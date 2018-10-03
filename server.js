
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

//enable CORS requests
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
});
app.use(express.static('Public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/Public/landingpage.html')
// });

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

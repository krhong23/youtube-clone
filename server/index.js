const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require("./config/key")

// Mongo DB Connection
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const users = require('./routes/users')
app.use('/api/users', users);
app.use('/api/video', require('./routes/video'));

const port = 5001

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

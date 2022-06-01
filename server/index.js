const express = require('express')
const app = express()
const port = 5001

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
app.use('/api/subscribe', require('./routes/subscribe'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const errorHandler = require('./middleware/errorHandler')
const CustomErrorHandler = require('./services/CustomErrorHandler')
require("dotenv").config()
APP_PORT = process.env.PORT || 3000;


// database connection
mongoose.connect('mongodb://127.0.0.1:27017/rest',{
    useNewUrlParser:true
})
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.on('open',()=>{
    console.log('connection successfull......')
})

// use json from express
app.use(express.json())
// routes
const routes  = require('./routes')


// use middleware
// app.use(errorHandler);
app.use('/api',routes,errorHandler)

app.listen(APP_PORT, () => {
    console.log(`server is listening on port ${APP_PORT}`)
})
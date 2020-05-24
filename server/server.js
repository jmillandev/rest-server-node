require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const colors = require('colors')

const app = express()

app.use(express.static(__dirname + '/public')) // Esta linea es para servir ficheros estaticos

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use(require('../routes/index'))

mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( _ => {
    console.log('MongoDB is connected'.green)
}).catch(err => {
    console.log('MongoDB connection unsuccessful'.red, err)
})

app.listen(process.env.PORT, _ => console.log('Escuchando el puerto', `${process.env.PORT}`.green))
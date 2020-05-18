require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const colors = require('colors')

const app = express()

app.use( express.static( __dirname + '/public' ) ) // Esta linea es para servir ficheros estaticos

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use( require('../routes/users') )

mongoose.connect('mongodb://localhost:27017/coffee')
    .then(res => console.log('DB ONLINE'.green))
    .catch(err => console.error(err))

app.listen(process.env.PORT, _ => console.log('Escuchando el puerto',`${process.env.PORT}`.green))
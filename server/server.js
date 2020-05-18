require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const colors = require('colors')

const app = express()

app.use( express.static( __dirname + '/public' ) ) // Esta linea es para servir ficheros estaticos

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/users/', (req, res) => {
    res.json({
        'success': true,
        'message': "request GET",
        'info': {
            'url': req.url
        }
    }
)
})


app.post('/users/', (req, res) => {
    id = req.params.user_id
    res.json({
        'success': true,
        'message': "request POST",
        'info': {
            body: req.body // Esto lo podemos hacer de una manera sencilla  gracias al modulo body-parser
        }
    }
)
})

app.patch('/users/:user_id', (req, res) => {
    id = req.params.user_id
    res.json({
        'success': true,
        'message': "request PATCH",
        'info': {
            id
        }
    }
)
})

app.delete('/users/', (req, res) => {
    res.json({
        'success': true,
        'message': "request DELETE",
        'url': req.url
    }
)
})

mongoose.connect('mongodb://localhost:27017/coffee')
    .then(res => console.log('DB ONLINE'.green))
    .catch(err => console.error(err))

app.listen(process.env.PORT, _ => console.log('Escuchando el puerto',`${process.env.PORT}`.green))
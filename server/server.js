require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')


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
        'message': "request GET",
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
        'message': "request GET",
        'info': {
            id
        }
    }
)
})

app.get('/users/', (req, res) => {
    res.json({
        'success': true,
        'message': "request GET",
        'url': req.url
    }
)
})

app.listen(process.env.PORT, _ => console.log(`Escuchando el puerto ${process.env.PORT}!`))
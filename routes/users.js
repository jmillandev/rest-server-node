const express = require('express')
const app = express()

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

module.exports = app;
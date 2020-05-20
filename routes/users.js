const User = require('../models/users')
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
    let body = req.body
    let user = new User({
        ...body
    })
    user.save()
        .then(data => res.json({
            success: true,
            info: user,
            message: "Usuario creado exitosamente!"
        }))
        .catch( err => res.status(400).json({
            success: false,
            detail: err
        }))
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
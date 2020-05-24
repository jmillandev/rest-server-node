const User = require('../models/users')
const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const app = express()

app.get('/users/', (req, res) => {

    let offset = Number(req.query.offset) || 0
    let limit = Number(req.query.limit) || 5

    User.find({})
        .skip(offset)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    detail: err
                })
            }
            res.json({
                success: true,
                info: { users }
            })
        })
})


app.post('/users/', (req, res) => {
    let body = req.body
    let user = new User({
        ...body,
        password: bcrypt.hashSync(body.password, 10)
    })
    user.save()
        .then(data => res.json({
            success: true,
            info: { user },
            message: "Usuario creado exitosamente!"
        }))
        .catch(err => res.status(400).json({
            success: false,
            detail: err
        }))
})

app.patch('/users/:user_id', (req, res) => {
    let id = req.params.user_id
    let body = _.pick(red.body, ['name', 'email', 'img', 'role', 'state'])
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                success: false,
                detail: err
            })
        }
        res.json({
            'success': true,
            'message': "User Updated",
            'info': { user: userDB }
        })
    })

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
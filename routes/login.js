const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/users')
const { raise_err } = require('./utils')

const app = express()

app.post('/login', (req, res) => {
    const body = req.body
    User.findOne({ email: body.email }, (err, user) => {
        if (err) return raise_err(res, err)

        not_match_err = { message: "Usuario o contraseñas incorrectos" }
        if (!user) {
            console.log("HOLA MUNDO")
            return raise_err(res, not_match_err, 400)
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
            return raise_err(res, not_match_err, 400)
        }

        let token = jwt.sign(
            { user },
            process.env.tokenSeed,
            { expiresIn: "7d" }
        )
        return res.json({
            success: true,
            info: { user, token }
        })
    })
})

module.exports = app;

const jwt = require('jsonwebtoken')
const { raise_err } = require('../utils/errors')

const verifyToken = (req, res, next) => {
    const tokenNotFountErr = {message: "No se envio ningun token para verificar permisos."}

    if (!req.get('authorization')) return raise_err(res, tokenNotFountErr)
    token_raw = req.get('authorization').split(' ')
    token = token_raw[token_raw.length - 1]

    jwt.verify(token, process.env.tokenSeed, (err, payload) => {
        if (err) return raise_err(res, err, status=401)
        req.user = payload.user
        next()
    })

}

module.exports = {
    verifyToken
}
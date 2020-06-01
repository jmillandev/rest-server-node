const fs = require('fs')
const path = require('path')

const express = require('express')

const app = express()

app.get('/images/:img', (req, res) =>{
    const img = req.params.img
    const imagePath = path.resolve(__dirname, `../../uploads/${img}`)

    if (fs.existsSync(imagePath)) {
        return res.sendFile(imagePath)
    } else {
        return res.sendStatus(404)
    }
})

module.exports = app
const path = require('path')

const express = require('express')
const fileUpload = require('express-fileupload')

const User = require('../models/users')
const { verifyToken } = require('../middlewares/authentication');
const validImageExt = require('../validators/validImageExt')
const { raise_err } = require('../utils/errors')
const fileNameGen = require('../utils/fileNameGenerators')
const { deleteFile } = require('../utils/fileManager')

const app = express()

// default options
app.use(fileUpload())


app.put('/uploads/', [verifyToken], (req, res) => {
    if (!req.files) {
        return raise_err(
            res,
            { message: 'No se ha seleccionado ningun archivo.' },
            400
        )
    }

    let image = req.files.image
    const err = validImageExt(image)
    if (err) return raise_err(res, err, 400)

    const fileName = fileNameGen(image.name, req.user._id)
    const imagesDirPath = path.resolve(__dirname, '../../uploads')

    image.mv(`uploads/${fileName}`, err => {
        if (err) return raise_err(req, err)
    })

    User.findByIdAndUpdate(
        req.user._id,
        { img: fileName },
        { runValidators: true },
        (err, userDB) => {
            if (err) {
                deleteFile(imagesDirPath + '/' + fileName)
                return raise_err(req, err)
            }

            deleteFile(imagesDirPath + '/' + userDB.img)
            return res.json({
                success: true,
                message: "Archivo subido exitosamente",
                info: {  }
            })
        }
    )

})

module.exports = app
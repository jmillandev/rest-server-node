const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

let validRoles = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido'
}


let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El campo Nombre es requerido."]
    },
    email: {
        type: String,
        required: [true, "El campo Email es requerido."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerido"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: validRoles,
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
})

userSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}

userSchema.plugin( uniqueValidator, {message:  'El campo {PATH} debe ser unico'} )

module.exports = mongoose.model( 'User', userSchema )
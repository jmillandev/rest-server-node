const { raise_err } = require('../../utils/errors')

const isAdmin = (req, res, next) => {
    if (!req.user.role == 'ADMIN_ROLE') {
        
        return raise_err(res, {message:"No posee los permisos necesarios para acceder a este recurso"})
    }
    next()
}

module.exports = {
    isAdmin
}
const imageExtensions = ['png', 'jpeg', 'jpg']

const errors = {
    empty : {
        message: "No se envio ningun archivo."
    },
    invalid: {
        message: `Archivo invalido. Solo le permiten archivos en formato: ${imageExtensions.join(', ')}.`
    }
}

module.exports = (file => {
    if (!file)
        return errors.empty

    const ext_raw = file.name.split('.')
    const ext = ext_raw[ext_raw.length - 1]

    if (imageExtensions.indexOf(ext) < 0)
        return errors.invalid
})
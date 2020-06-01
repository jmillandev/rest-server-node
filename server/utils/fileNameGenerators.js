module.exports = (fileName, id) => {
    ext_raw = fileName.split('.')
    ext = ext_raw[ext_raw.length - 1]
    return `${id}-${new Date().getMilliseconds()}.${ext}`
}
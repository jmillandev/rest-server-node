const raise_err = (res, err, status = 500) => res.status(status)
    .json({
        success: false,
        detail: err,
    })

module.exports = {
    raise_err,
}
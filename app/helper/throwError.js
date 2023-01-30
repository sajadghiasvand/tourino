module.exports.throwError = function (msg, status=400) {
    const error = new Error(msg)
    error.statusCode = status || 500
    error.message = msg || 'error'
    throw error
}

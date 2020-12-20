function serverError(where, res, error) {
    console.error("Error caught in " + where)
    console.error(error)
    return res.status(500).json({error: error.toString()});
}

function logError(where, error) {
    console.error("Error caught in " + where)
    console.error(error)
}

exports.serverError = serverError
exports.logError = logError
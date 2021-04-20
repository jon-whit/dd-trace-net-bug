const INTERNAL = 'ERR_INTERNAL'

class APIError extends Error {
    constructor(message, code) {
        super(message)
        this.name = this.constructor.name
        this.code = code
    }
}

class InternalError extends APIError {
    constructor (message = 'Internal error', code = INTERNAL) {
        super(message, code)
      }
}

module.exports = {
    INTERNAL,
    InternalError
}
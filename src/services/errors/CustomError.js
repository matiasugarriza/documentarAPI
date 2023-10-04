module.exports = class CustomError {
    createError = async ({ name = "Error", cause, message, code = 2 }) => {
        const error = new Error(message);
        error.cause = cause;
        error.name = name;
        error.code = code;
        throw error
    }
}

const generateUserErrorInfo = (user) => {
    return `Estos datos son obligatorios:
        * first_name: ${user.first_name}
        * last_name: ${user.last_name}
        * email: ${user.email}
        * password: ${user.password}`
};

module.exports = { generateUserErrorInfo }
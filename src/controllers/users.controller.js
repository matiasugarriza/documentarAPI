const User = require('../dao/classes/users.dao');
const CustomError = require('../services/errors/CustomError');
const EErrors = require('../services/errors/errors-enum')
const { generateUserErrorInfo } = require('../services/errors/messages/user-creation-error.message')
const userService = new User();
const errorService = new CustomError();
const getUsers = async (req, res) => {
    let result = await userService.getUsers();
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const getUserById = async (req, res) => {
    const { oid } = req.params;
    let result = await userService.getUserById(oid);
    if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
    res.send({ status: 'success', result: result });
}
const createUser = async (req, res) => {
    const user = req.body;
    const { first_name, last_name, email, password } = user;
    if (!first_name || !last_name || !email || !password){
        errorService.createError({
            name: "User creation error",
            cause: generateUserErrorInfo({first_name, last_name, email, password}),
            message: "Error to create user",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }else{
        let result = await userService.createUser(user);
        if (!result) return res.status(500).send({ status: "error", error: 'Algo salió mal, vuelva a intentarlo más tarde' });
        res.send({ status: 'success', result: result });
    }

}

/* const updateUser = async (req, res) =>{
    const user = req.body;
    let result = await userService.createUser(user);
    if(!result) return res.status(500).send({status:"error",error:'Algo salió mal, vuelva a intentarlo más tarde'});
    res.send({status:'success', result:result});
} */

const deleteUser = async (req, res) => {
    const { oid } = req.params;
    await userService.deleteUser(oid);
    res.send({ status: 'success', result: 'Orden de Compra eliminada!' })
}
module.exports = {
    getUsers, getUserById, createUser, deleteUser
}
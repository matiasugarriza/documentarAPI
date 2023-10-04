const usersModel = require('../models/users.model');

class User {
    getusers = async() =>{
        try{
            let result = await usersModel.find()
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    getBusinessById = async(id) =>{
        try{
            let result = await usersModel.findOne({_id:id})
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    createBusiness = async(user) =>{
        try{
            let result = await usersModel.create(user)
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    updateBusiness = async(id,user) =>{
        try{
            let result = await usersModel.updateOne({_id:id},{$set:user})
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
    deleteBusiness = async(id) =>{
        try{
            let result = await usersModel.deleteOne({_id:id})
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}
module.exports = User
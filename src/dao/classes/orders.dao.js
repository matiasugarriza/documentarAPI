const ordersModel = require('../models/orders.model');
const usersModel = require('../models/users.model')
class Order {
    getOrders = async () => {
        try {
            let result = await ordersModel.find()
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    getOrderById = async (id) => {
        try {
            let result = await ordersModel.findOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    createOrder = async (order) => {
        try {
            console.log(order)
            /* const response = await ordersModel.create(order);
            const oid = response._id;
    
            const user = await usersModel.findById(order.user);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
    
            user.orders.push(oid);
            await user.save();
    
            return oid; */
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    
    updateOrder = async (id, order) => {
        try {
            let result = await ordersModel.updateOne({ _id: id }, { $set: order })
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    deleteOrder = async (id) => {
        try {
            let result = await ordersModel.deleteOne({ _id: id })
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
module.exports = Order
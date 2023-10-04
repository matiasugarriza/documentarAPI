const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    user: {
        type:String,
        require:true
    },
    message: {
        type:String,
        require: true
    }
})

const Message = mongoose.model('message', MessageSchema)
module.exports = Message
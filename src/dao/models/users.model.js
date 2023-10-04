const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const collection = 'users';
const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: [0, "La edad debe ser un número positivo"],
  },
  phone: {
    type: Number,
    required: false,
  },
  cart: {
    type:
    {
      cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    }
    ,
    default: {}
  },
  orders: {
    type:
      [
        {
          order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'orders'
          }
        }
      ]
    ,
    default: []
  },
  password: {
    type: String,
    minlength: [6, "La contraseña debe tener como mínimo 6 caracteres"],
    trim: true,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
});
const usersModel = mongoose.model(collection, schema);
module.exports = usersModel;
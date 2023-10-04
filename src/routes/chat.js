const express = require('express')
const { Router } = express
const router = new Router()
const MessageSchema = require('../dao/models/messages')


router.get('/', (req, res) => {
    res.render('chat',{})
})
router.post('/', (req, res) => {
    //Manager Mongodb
    let newMessage = req.body
    let message = new MessageSchema(newMessage)
    message.save()
        .then(message => {
            res.status(201).send({
                msg: 'Nuevo Mensaje',
                data: message
            })
        }).catch(err => {
            console.log(err)
        })
})

module.exports = router
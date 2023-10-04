const express = require('express')
const { Router } = express
const router = new Router()
const {createUser} = require('../controllers/users.controller')


router.get('/', (req, res) => {
    res.render('register', {})
})

router.post('/', createUser);

router.get('/failedregister',(req,res)=>{
    res.send('Error al realizar el registro.')
})

module.exports = router
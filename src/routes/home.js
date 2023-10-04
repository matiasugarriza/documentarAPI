const { Router } = require('express')
const passport = require('passport')
const users = require('../dao/models/users.model')
const passportCall = require('../utils/passportCall')
const router = new Router()

router.get('/', (req,res)=>{
    if(req.cookies['cookieToken']){
        res.redirect('/products?limit=10&page=1')
    }else{
        res.redirect('/login')
    }
})
router.get('/cart', passportCall('jwt'), async (req, res)=>{
    if(req.cookies['cookieToken']){
        let email = req.user.email
        let user = await users.findOne({email})
        res.redirect(`carts/${user.cart.id}`)
    }else{
        await res.redirect('/login')
    }
})

module.exports = router
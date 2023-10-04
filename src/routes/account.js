const express = require('express')
const { Router } = express
const router = new Router()
const passportCall = require('../utils/passportCall')
const users = require('../dao/models/users.model')

const auth = (req, res, next) => {
    if (!req.cookies['cookieToken']) {
        return res.redirect('/')
    }
    next()
}

router.get('/', auth, passportCall('jwt'), async (req, res) => {
        email = req.user.email
        let user = await users.findOne({ email })
        first_name = user.first_name
        last_name = user.last_name
        age = user.age
        res.render('account', { first_name, last_name, age })
}
)
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.clearCookie('cookieToken');
        res.redirect('/');
    });
});


module.exports = router
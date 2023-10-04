const { Router } = require('express')
const router = new Router()
const passport = require('passport')

router.get('/github',
    passport.authenticate('auth-github', { scope: ['user:email'] }))

router.get('/github/callback',
    passport.authenticate('auth-github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/products?limit=10&page=1')
    })

module.exports = router
const passport = require('passport')
const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy,
            function (err, user, info) {
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

const authorization = (role) => {
    return async (req,res,next)=>{
        if(!req.user) return res.status(401).send({error:'Unauthorized'})
        if(req.user.role == role) return res.status(401).send({error:'No permissions'})
    }
}
module.exports = passportCall
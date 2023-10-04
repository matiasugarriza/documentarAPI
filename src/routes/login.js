const { Router } = require('express')
const router = new Router()
const ProductsModel = require('../dao/models/products.model');
const ManagerMongo = require('../controllers/dbController')
const passport = require('passport')
const passportCall = require('../utils/passportCall')
const users = require('../dao/models/users.model')
const { isValidPassword } = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
  if(req.cookies['cookieToken']){
    res.redirect('/account')
  }else{
    res.render('login', {})
  }
})
router.post('/', async (req, res) => {
  let email = req.body.email
  const user = await users.findOne({ email })
  if (user) {
    let cart = user.cart.id
    let token = jwt.sign(
      { email: user.email, password: user.password, role: user.role, cart: user.cart.id},
      '4#cr/@ead3r',
      { expiresIn: '24h' }
    )
    res.cookie('cookieToken', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    }).redirect('/')
  }else{
    res.status(500).send("Usuario o contraseña incorrecta")
  }
})
router.delete('/', (req, res) => {
  req.session.destroy(err => {
    if (err) res.send('Logout ha fallado, vuelva a intentarlo')
  })
  res.redirect('/login')
})
router.get('/current', passportCall('jwt'),(req,res)=>{
  res.send(req.user)
}
)

module.exports = router

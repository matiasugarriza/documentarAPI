const routesHome = require('./home')
const routesBusiness = require('./business.routes')
const routesProducts = require('./products.routes')
const routesCarts = require('./carts.routes')
const routesOrders = require('./orders.routes')
const routesChat = require('./chat')
const routesLogin = require('./login')
const routesRegister = require('./register')
const routesAccount = require('./account')
const routesGithub = require('./github')
const routesMocking = require('./mocking.routes')

module.exports = { routesAccount, routesBusiness, routesCarts, routesChat, routesGithub, routesHome, routesLogin, routesOrders, routesProducts, routesRegister, routesMocking }
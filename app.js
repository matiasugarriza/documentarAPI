//Servidor
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

//Cookies & Sessions
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
//Rutas
const { routesAccount, routesBusiness, routesCarts, routesChat, routesGithub, routesHome, routesLogin, routesOrders, routesProducts, routesRegister, routesMocking } = require('./src/routes/router')

//Views
const handlebars = require('express-handlebars')
//File Storage & Mongodb
const ConnectMongoDb = require("./src/dao/classes/mongoDb")
const CONFIG = require('./src/config/config')
//Login
const passport = require('passport')
const passportCall = require('./src/utils/passportCall')
const { initializePassport } = require('./src/config/passport')
const addLogger = require('./src/config/logger')

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

//Swagger
const swaggerOptions = {
    definition: {
    openapi: "3.0.1" ,
    info: {
        title: "Documentación del proyecto Ecommerce", 
        description: "API para comercio electrónico"
    }
},
    apis:[`./src/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//Logger
app.use(addLogger);

//Passport & Sessions 
app.use(session({
    store: MongoStore.create({
        mongoUrl: CONFIG.db,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15,
    }),
    secret: CONFIG.secret,
    resave: true,
    saveUninitialized: true
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());



// Render
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/src/views')


app.use('/', routesHome)
app.use('/business', routesBusiness)
app.use('/products', passportCall('jwt'), routesProducts)
app.use('/carts', passportCall('jwt'), routesCarts)
app.use('/orders', passportCall('jwt'), routesOrders)
app.use('/chat', routesChat)
app.use('/login', routesLogin)
app.use('/register', routesRegister)
app.use('/account', routesAccount)
app.use('/auth', routesGithub)
app.use('/mockingproducts', routesMocking)



server.listen(CONFIG.port, () => {
    console.log('Server is running on port', CONFIG.port)
    let connect = new ConnectMongoDb()
    connect.connect(CONFIG.db)
})
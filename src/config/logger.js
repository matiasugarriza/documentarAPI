const winston = require('winston');
const CONFIG = require('./config')

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yelow',
        info: 'green',
        http: 'blue',
        debug: 'white'
    }
}

const devLogger = winston.createLogger({
    level: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]
});

const addLogger = (req, res, next) => {
    if (CONFIG.environment === 'production') {
        req.logger = prodLogger;
        req.logger.http(` ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} `);
    }else{
        req.logger = devLogger;
        req.logger.http(` ${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} `);
    }
    next()
}

module.exports = addLogger
const mongoose = require('mongoose')
class ConnectMongoDb{
    connect(CONFIG) {
        return mongoose.connect(CONFIG, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(connection => {
                this.connection = connection
                console.log('Conexión a db exitosa')
            })
            .catch(err => console.log(err))
    }
}
module.exports = ConnectMongoDb
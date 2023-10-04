const mongoose = require('mongoose')
const CONFIG = require('../config/config')
const MongoStore = require('connect-mongo')


class ManagerMongo {
    connect() {
        return mongoose.connect(CONFIG.db, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(connection => {
                this.connection = connection
                console.log('Conexión a db exitosa')
            })
            .catch(err => console.log(err))
    }
    create(res, Schema, data, url) {
        Schema.create(data)
            .then(respuesta => {
                res.status(201).redirect(url)
                console.log(respuesta)
            }).catch(err => {
                console.log(err)
            })
    }
    read(req, res, Schema, params) {
        if (req.query.title) {
            Schema.find({ title: { $regex: '.*' + req.query.title + '.*', $options: 'i' } }).lean()
                .then(respuesta => {
                    let docs = respuesta
                    res.status(201).render('index', { docs, req })
                }).catch(err => {
                    console.log(err)
                })
        } else if (params == undefined) {
            const options = {
                limit: parseInt(req.query.limit),
                page: parseInt(req.query.page),
                lean: true,
                sort: { price: (req.query.price), category: (req.query.category) }
            }
            Schema.paginate({}, options)
                .then(respuesta => {
                    let docs = respuesta.docs
                    let props = respuesta
                    res.status(201).render('index', { docs, props, req })
                }).catch(err => {
                    console.log(err)
                })
        } else {
            Schema.findById(params).lean()
                .then(respuesta => {
                    let docs = [respuesta]
                    if (respuesta !== null) {
                        res.status(201).render('index', { docs })
                    } else {
                        let response = "No existe el Documento especificado."
                        res.status(404).send({ msg: response })
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

    }
    update(req, res, Schema) {
        if (req.params.id) {
            paramsId = req.params.id
            data = req.body
        } else {
            paramsId = req.params.cid
            data = req.params.pid
        }
    }
    delete(res, Schema, params) {
        Schema.deleteOne({ _id: params })
            .then(respuesta => {
                res.status(201).send({ msg: 'Documento Eliminado con Éxito' })
                console.log(respuesta)
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = ManagerMongo


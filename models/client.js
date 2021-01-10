const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    name: String,
    personId: String,
    creditCard: String,
    creditLimit: String,
    personType:String,
    state: Boolean
})

module.exports = mongoose.model('Client', ClientSchema)
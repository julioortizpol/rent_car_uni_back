const mongoose = require('mongoose')

const RentAndReturnSchema = mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    rentDate: Date,
    devolutionDate: Date,
    dayAmount: Number,
    comment: String,
    close: Boolean,
    state: Boolean
})

module.exports = mongoose.model('RentAndReturn', RentAndReturnSchema)
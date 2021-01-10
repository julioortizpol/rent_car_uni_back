const mongoose = require('mongoose')

const InspectionSchema = mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicle'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    grated: Boolean,
    fuelQuantity: String,
    replacementRubber:Boolean,
    vehicleJack: Boolean,
    breakingGlass: Boolean,
    wheelState: [Boolean],
    date: Date,
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    state: Boolean
})

module.exports = mongoose.model('Inspection', InspectionSchema)
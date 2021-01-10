const mongoose = require('mongoose')

const VehicleTypeSchema = mongoose.Schema({
    desciption: String,
    state: Boolean
})

const BrandSchema = mongoose.Schema({
    desciption: String,
    state: Boolean
})

const FuelTypeSchema = mongoose.Schema({
    desciption: String,
    state: Boolean
})

const ModelSchema = mongoose.Schema({
    brand :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'
    },
    desciption: String,
    state: Boolean
})




const VehicleSchema = mongoose.Schema({
    desciption: String,
    chasisNumber: Number,
    motorNumber: Number,
    licensePlateNumber: String,
    vehicleType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vehicletypes'
    },
    brand :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'models'
    },
    fuelType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fueltypes'
    },
    state: Boolean
})

const VehicleType = mongoose.model('VehicleType', VehicleTypeSchema)
const Brand = mongoose.model('Brand', BrandSchema)
const Model = mongoose.model('Model', ModelSchema)
const FuelType = mongoose.model('FuelType', FuelTypeSchema)
const Vehicle = mongoose.model('Vehicle', VehicleSchema)





module.exports = {
    VehicleType,
    Brand,
    Model,
    FuelType,
    Vehicle
}


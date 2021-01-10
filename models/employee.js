const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
    name: String,
    personId: String,
    workShift: String,
    comisionPercent: String,
    dateOfAdmision:Date,
    state: Boolean
})

module.exports = mongoose.model('Employee', EmployeeSchema)
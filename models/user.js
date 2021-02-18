const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    user: String,
    password: String,
    login:Boolean,
})

module.exports = mongoose.model('User', UserSchema)
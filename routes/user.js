const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Employee = require('../models/employee');

router.post('/', async (req, res) => {
    const users = await User.find();
    const loginUser = users.filter(user => {
        return (req.body.user == user.user && req.body.password == user.password)
    })
    try {
        if(loginUser.length != 0){
            const [user] = loginUser;
            user.login = true;
            res.json(user);
        }else{
            res.json([]);
        }
    } catch (err) {
        console.log(err)
        res.json({ message: err })
    }
});

module.exports = router;
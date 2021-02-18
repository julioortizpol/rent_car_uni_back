const express = require('express');
const router = express.Router();
const RentAndReturn = require('../models/rentAndReturn');
const Employee = require('../models/employee');
const Client = require('../models/client');
const { Vehicle } = require('../models/vehicle');
//const Inspection = require('../models/inspection');


router.get('/', async (req, res) => {
    try {
        const rentAndReturns = await RentAndReturn.find()
            .populate({ path: 'employee', model: Employee })
            .populate({ path: 'client', model: Client });
        res.json(rentAndReturns);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    console.log(req.body.devolutionDate)
    if(typeof(typeof(req.body.devolutionDate)) == "string"){
        var stringDate = req.body.devolutionDate;
        stringDate.indexOf("T");
        stringDate = stringDate.slice(1, stringDate.indexOf("T"));
        req.body.devolutionDate = new Date(stringDate);
    }
    console.log(req.body.devolutionDate)
    if(typeof(typeof(req.body.rentDate)) == "string"){
        var stringDate = req.body.rentDate;
        stringDate.indexOf("T");
        stringDate = stringDate.slice(1, stringDate.indexOf("T"));
        req.body.rentDate = new Date(stringDate)
    }
    
    const rentAndReturn = new RentAndReturn({
        vehicle: req.body.vehicle,
        client: req.body.client,
        inspection: req.body.inspection,
        employee: req.body.employee,
        rentDate: req.body.rentDate,
        devolutionDate: req.body.devolutionDate,
        dayAmount: req.body.dayAmount,
        comment: req.body.comment,
        close: false,
        state: true,
    });
    try {
        const savePost = await rentAndReturn.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:rentAndReturnId", async (req, res) => {
    
    if(typeof(typeof(req.body.devolutionDate)) == "string"){
        var stringDate = req.body.devolutionDate;
        stringDate.indexOf("T");
        stringDate = stringDate.slice(1, stringDate.indexOf("T"));
        req.body.devolutionDate = new Date(stringDate);
    }
    if(typeof(typeof(req.body.rentDate)) == "string"){
        var stringDate = req.body.rentDate;
        stringDate.indexOf("T");
        stringDate = stringDate.slice(1, stringDate.indexOf("T"));
        req.body.rentDate = new Date(stringDate);
    }
    
    try {
        const updatedRentAndReturn = await RentAndReturn.updateOne(
            { _id: req.params.rentAndReturnId },
            {
                $set: {
                    vehicle: req.body.vehicle,
                    client: req.body.client,
                    employee: req.body.employee,
                    rentDate: req.body.rentDate,
                    inspection: req.body.inspection,
                    devolutionDate: req.body.devolutionDate,
                    dayAmount: req.body.dayAmount,
                    comment: req.body.comment,
                    close: req.body.close,
                    state: req.body.state,
                }
            });
        res.json(updatedRentAndReturn);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
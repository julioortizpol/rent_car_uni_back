const express = require('express');
const router = express.Router();
const RentAndReturn = require('../models/rentAndReturn');
const Employee = require('../models/employee');
const Client = require('../models/client');
const { Vehicle } = require('../models/vehicle');



router.get('/', async (req, res) => {
    try {
        const rentAndReturns = await RentAndReturn.find()
            .populate({ path: 'employee', model: Employee })
            .populate({ path: 'client', model: Client })
            .populate({ path: 'vehicle', model: Vehicle });;
        res.json(rentAndReturns);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    const rentAndReturn = new RentAndReturn({
        vehicle: req.body.vehicle,
        client: req.body.client,
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
    try {
        const updatedRentAndReturn = await RentAndReturn.updateOne(
            { _id: req.params.rentAndReturnId },
            {
                $set: {
                    vehicle: req.body.vehicle,
                    client: req.body.client,
                    employee: req.body.employeeId,
                    rentDate: req.body.rentDate,
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
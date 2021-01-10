const express = require('express');
const router = express.Router();
const  {VehicleType}  = require('../models/vehicle');

router.get('/', async (req, res) => {
    try {
        const vehicleType = await VehicleType.find();
        res.json(vehicleType);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    const vehicleType = new VehicleType({
        "desciption": req.body.desciption,
        "state": true
    });
    try {
        const savePost = await vehicleType.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:vehicleTypeId", async (req, res) => {
    try {
        const updatedvehicleType = await VehicleType.updateOne(
            { _id: req.params.vehicleTypeId },
            {
                $set: {
                    "desciption": req.body.desciption,
                    "state": req.body.state
                }
            });
        res.json(updatedvehicleType);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
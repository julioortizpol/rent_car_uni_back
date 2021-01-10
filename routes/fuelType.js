const express = require('express');
const router = express.Router();
const  {FuelType}  = require('../models/vehicle');

router.get('/', async (req, res) => {
    try {
        const fuelType = await FuelType.find();
        res.json(fuelType);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    const fuelType = new FuelType({
        "desciption": req.body.desciption,
        "state": true
    });
    try {
        const savePost = await fuelType.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:fuelTypeId", async (req, res) => {
    try {
        const updatedFuelType = await FuelType.updateOne(
            { _id: req.params.fuelTypeId },
            {
                $set: {
                    "desciption": req.body.desciption,
                    "state": req.body.state
                }
            });
        res.json(updatedFuelType);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
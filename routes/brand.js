const express = require('express');
const router = express.Router();
const  {Brand}  = require('../models/vehicle');

router.get('/', async (req, res) => {
    try {
        const brand = await Brand.find();
        res.json(brand);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    const brand = new Brand({
        "desciption": req.body.desciption,
        "state": true
    });
    try {
        const savePost = await brand.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:brandId", async (req, res) => {
    try {
        const updatedBrand = await Brand.updateOne(
            { _id: req.params.vehicleTypeId },
            {
                $set: {
                    "desciption": req.body.desciption,
                    "state": req.body.state
                }
            });
        res.json(updatedBrand);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
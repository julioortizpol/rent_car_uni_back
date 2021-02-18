const express = require('express');
const router = express.Router();
const { VehicleType,
    Brand,
    Model,
    FuelType,
    Vehicle } = require('../models/vehicle');

router.get('/', async (req, res) => {
    try {
        const vehicle = await Vehicle.find()
            .populate({ path: 'brand', model: Brand , select:"desciption "})
            .populate({ path: 'fuelType', model: FuelType, select:"desciption " })
            .populate({ path: 'model', model: Model , select:"desciption "})
            .populate({ path: 'vehicleType', model: VehicleType , select:"desciption"});
        res.json(vehicle);
    } catch (err) {
        console.log(err)
        res.json({ message: err })
    }

});

router.get('/:vehicleId', async (req, res) => {
    try{
        const vehicle = await Vehicle.findById(req.params.vehicleId).populate({ path: 'brand', model: Brand , select:"desciption "})
        .populate({ path: 'fuelType', model: FuelType, select:"desciption " })
        .populate({ path: 'model', model: Model , select:"desciption "})
        .populate({ path: 'vehicleType', model: VehicleType , select:"desciption"});
        res.json(vehicle);
    }catch(err){
        res.json({message:err})
    }
});


router.post('/', async (req, res) => {
    const vehicle = new Vehicle({
        desciption: req.body.desciption,
        chasisNumber: req.body.chasisNumber,
        motorNumber: req.body.motorNumber,
        licensePlateNumber: req.body.licensePlateNumber,
        vehicleType: req.body.vehicleType,
        brand: req.body.brand,
        imageUrl: req.body.imageUrl,
        model: req.body.model,
        fuelType: req.body.fuelType,
        state: true
    });
    try {
        const savePost = await vehicle.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:vehicleId", async (req, res) => {
    try {
        const updatedvehicle = await Vehicle.updateOne(
            { _id: req.params.vehicleId },
            {
                $set: {
                    desciption: req.body.desciption,
                    chasisNumber: req.body.chasisNumber,
                    motorNumber: req.body.motorNumber,
                    licensePlateNumber: req.body.licensePlateNumber,
                    vehicleType: req.body.vehicleType,
                    brand: req.body.brand,
                    imageUrl: req.body.imageUrl,
                    model: req.body.model,
                    fuelType: req.body.fuelType,
                    state: req.body.state
                }
            });
        res.json(updatedvehicle);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
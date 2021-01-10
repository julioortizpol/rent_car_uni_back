const express = require('express');
const router = express.Router();
const Inspection = require('../models/Inspection');
const Employee = require('../models/employee');
const Client = require('../models/client');
const {Vehicle} = require('../models/vehicle');



router.get('/', async (req, res) => {
    try {
        const inspections = await Inspection.find()
        .populate({ path: 'employeeId', model: Employee})
        .populate({ path: 'client', model: Client})
        .populate({ path: 'vehicle', model: Vehicle});;
        res.json(inspections);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    const inspection = new Inspection({
        vehicle: req.body.vehicle,
        client: req.body.client,
        grated: req.body.grated,
        fuelQuantity: req.body.fuelQuantity,
        replacementRubber: req.body.replacementRubber,
        vehicleJack: req.body.vehicleJack,
        breakingGlass: req.body.breakingGlass,
        wheelState: req.body.wheelState,
        date: req.body.date,
        employeeId: req.body.employeeId,
        state: true,
    });
    try {
        const savePost = await inspection.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:InspectionId", async (req, res) => {
    try {
        const updatedInspection = await Inspection.updateOne(
            { _id: req.params.InspectionId },
            {
                $set: {
                    vehicle: req.body.vehicle,
                    client: req.body.client,
                    grated: req.body.grated,
                    fuelQuantity: req.body.fuelQuantity,
                    replacementRubber: req.body.replacementRubber,
                    vehicleJack: req.body.vehicleJack,
                    breakingGlass: req.body.breakingGlass,
                    wheelState: req.body.wheelState,
                    date: req.body.date,
                    employeeId: req.body.employeeId,
                    state: req.body.state,
                }
            });
        res.json(updatedInspection);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
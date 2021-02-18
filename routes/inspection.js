const express = require('express');
const router = express.Router();
const Inspection = require('../models/Inspection');
const Employee = require('../models/employee');



router.get('/', async (req, res) => {
    try {
        const inspections = await Inspection.find()
        ;
        res.json(inspections);
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/:InspectionId', async (req, res) => {
    try{
        const inspection = await Inspection.findById(req.params.InspectionId);
        res.json(inspection);
    }catch(err){
        res.json({message:err})
    }
});


router.post('/', async (req, res) => {
    if(typeof(typeof(req.body.date)) == "string"){
        var stringDate = req.body.date;
        stringDate.indexOf("T");
        stringDate = stringDate.slice(1, stringDate.indexOf("T"));
        req.body.date = new Date(stringDate);
    }
    const inspection = new Inspection({
        vehicle: req.body.vehicle,
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
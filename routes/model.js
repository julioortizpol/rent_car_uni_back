const express = require('express');
const router = express.Router();
const  {Model, Brand}  = require('../models/vehicle');

router.get('/', async (req, res) => {
    try {
        const model = await Model.find().populate({ path: 'brand', model: Brand });
        console.log("helo " + model)
        res.json(model);
    } catch (err) {
        console.log(err)
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    const model = new Model({
        "brand": req.body.brand,
        "desciption": req.body.desciption,
        "state": true
    });
    try {
        const savePost = await model.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:modelId", async (req, res) => {
    try {
        const updatedModel = await Model.updateOne(
            { _id: req.params.modelId },
            {
                $set: {
                    "brand": req.body.brand,
                    "desciption": req.body.desciption,
                    "state": req.body.state
                }
            });
        res.json(updatedModel);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
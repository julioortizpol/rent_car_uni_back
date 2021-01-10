const express = require('express');
const router = express.Router();
const Client = require('../models/client');




router.get('/:clientId', async (req, res) => {
    try {
        const client = await Client.findById(req.params.clientId);
        res.json(client);
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/', async (req, res) => {
    const client = new Client({
        "name": req.body.name,
        "personId": req.body.personId,
        "creditCard": req.body.creditCard,
        "creditLimit": req.body.creditLimit,
        "personType": req.body.personType,
        "state": req.body.state
    });
    try {
        const savePost = await client.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err })
    }
});

router.patch("/:clientId", async (req, res) => {
    try {
        const updatedClient = await Client.updateOne(
            { _id: req.params.clientId },
            {
                $set: {
                    "name": req.body.name,
                    "personId": req.body.personId,
                    "creditCard": req.body.creditCard,
                    "creditLimit": req.body.creditLimit,
                    "personType": req.body.personType,
                    "state": req.body.state
                }
            });
        res.json(updatedClient);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
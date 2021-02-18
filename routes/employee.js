const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');




router.get('/:employeeId', async (req, res) => {
    try{
        const employee = await Employee.findById(req.params.employeeId);
        res.json(employee);
    }catch(err){
        res.json({message:err})
    }
});

router.get('/', async (req, res) => {
    try{
        const employees = await Employee.find();
        res.json(employees);
    }catch(err){
        res.json({message:err})
    }
});


router.post('/', async (req, res) => {
    if(typeof(typeof(req.body.dateOfAdmision)) == "string"){
        var stringDate = req.body.dateOfAdmision;
        stringDate.indexOf("T");
        stringDate = stringDate.slice(1, stringDate.indexOf("T"));
        req.body.dateOfAdmision = new Date(stringDate);
    }
    const employee = new Employee({
        "name": req.body.name,
        "personId": req.body.personId,
        "workShift": req.body.workShift,
        "comisionPercent": req.body.comisionPercent,
        "dateOfAdmision": req.body.dateOfAdmision,
        "state": req.body.state
    });
    try{
        const savePost = await employee.save();
        res.json(savePost);
    }catch(err){
        res.json({message: err})
    }
});

router.patch("/:employeeId", async (req,res)=>{
    if(typeof(typeof(req.body.dateOfAdmision)) == "string"){
        var stringDate = req.body.dateOfAdmision;
        stringDate.indexOf("T");
        stringDate = stringDate.slice(1, stringDate.indexOf("T"));
        req.body.dateOfAdmision = new Date(stringDate);
    }
    try{
        const updatedEmployee = await Employee.updateOne(
            {_id: req.params.employeeId},
            {$set:{
            "name": req.body.name,
            "personId": req.body.personId,
            "workShift": req.body.workShift,
            "comisionPercent": req.body.comisionPercent,
            "dateOfAdmision": req.body.dateOfAdmision,
            "state": req.body.state}});
        res.json(updatedEmployee);
    }catch(err){
        res.json({message:err})
    }
});

module.exports = router;
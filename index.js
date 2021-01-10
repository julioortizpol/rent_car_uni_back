const express = require('express');
const app = express();
const  mongoose  = require('mongoose');
require('dotenv/config')
var bodyParser = require('body-parser')
const cors = require('cors')

//RoutesObjects
const employeeRoutes = require('./routes/employee');
const vehicleTypeRoutes = require('./routes/vehicleType');
const brandRoutes = require('./routes/brand');
const fuelTypeRoutes = require('./routes/fuelType');
const modelRoutes = require('./routes/model');
const vehicleRoutes = require('./routes/vehicle');
const clientRoutes = require('./routes/client');
const inspectionRoutes = require('./routes/inspection');
const rentAndReturnRoutes = require('./routes/rentAdnReturn');

app.use(bodyParser.json())
app.use(cors())

//MW Routes
app.use('/employee', employeeRoutes)
app.use('/vehicleType', vehicleTypeRoutes)
app.use('/brand', brandRoutes)
app.use('/fuel', fuelTypeRoutes)
app.use('/model', modelRoutes)
app.use('/vehicle', vehicleRoutes)
app.use('/client', clientRoutes)
app.use('/inspection', inspectionRoutes)
app.use('/rentAndReturn', rentAndReturnRoutes)


app.get('/', (req,res) =>{
    res.send("Home")
});


mongoose.connect(process.env.DB_CONNECCTION, { useUnifiedTopology: true },()=>{
    console.log("Succes")
})

app.listen(3000, ()=> console.log('Listen '))




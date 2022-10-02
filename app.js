const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mongoose = require('mongoose');
const userRoutes = require('./Routes/UserRoute.js')
const uploadRoutes = require("./Routes/UploadRoute.js")
const CONNECTION_URL = "mongodb://localhost:27017"

app.use([bodyParser.json(),bodyParser.urlencoded({extended:true}),expressValidator()])

// ROUTES
app.use("/user",userRoutes);
app.use("/upload",uploadRoutes);

// DATABASE
mongoose.connect(CONNECTION_URL).then(()=>{
      
    app.listen(5000,()=>{
        console.log("Server is running")
    })

})
.catch((error)=>{
    console.log(error)
})


// To fix the proxy error when setting up the proxy in react app 
// packahe.json just in terminal write the command npm audit fix --force
// and restart the server
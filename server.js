const express = require("express");

const {PORT, MONGODB_URL} = require("./config");
const { DBconnection } = require("./config/db");
const postRoute = require("./routes/postRoute")
const authRoute = require("./routes/authRoute")
const cors = require("cors");
const errorHandler = require("./middlewares/errors");

const app = express();

let startServer = async ()=>{

    //! database connection 

    DBconnection();
    
    //! middleware
   app.use(express.json())
   app.use(cors())
  
     
   //! load routes 
   app.use("/api",postRoute)
   app.use("/api/auth",authRoute)

   app.use(errorHandler)

    //! listen a port 
    app.listen(PORT || 5000 , err =>{
        if(err) throw err;

        console.log('app is running on port 5000')
    })
}

startServer()
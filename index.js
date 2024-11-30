require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/routes')

const app = express()


app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads',express.static('./uploads'))

const PORT = 5000 || process.env.PORT

app.listen(PORT,()=>{
    console.log("Server running on PORT 5000 ");
    
})

app.get('/',(req,res)=>{
    res.send(`<h1>Server running and waiting for client request!!</h1>`)
})


const URL = process.env.CONNECTION_STRING

//database connection 

mongoose.connect(URL).then(res=>{
    console.log("Database connection Successfull");
    
}).catch(err=>{
    console.log("Failed to establish database connection!!!");
    
})

 
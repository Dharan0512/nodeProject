const express = require('express')
const morgan = require("morgan")
const dotenv = require('dotenv')
dotenv.config()
const {connectDB} = require('./db/connect')

const authRoutes = require('./routes/authRoutes')
const app = express()
const PORT = 4000

//middleware
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use('/api/v1/auth',authRoutes)


//server and DBConnect init
const start = async ()=>{
    try {
       await connectDB(process.env.MONGO_URL) 
        app.listen(PORT, ()=>{
            console.log(`server listening on Port ${PORT}...`);
        })
    } catch (error) {
        console.log('server error',error);
    }
}

start()
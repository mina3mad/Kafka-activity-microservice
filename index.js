import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import dbConnect from './src/infrastructure/database/dbConnection.js';


const app = express()

dotenv.config()

dbConnect()

app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello to Kafka Activity Microservice"})
})

const port = process.env.PORT||3000
app.listen(port, () => console.log(`app listening on port ${port}!`))

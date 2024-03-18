import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import cors from 'cors'
import route from "./routes/userroute.js"

const app=express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000; 
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {

    console.log("Database Connected Successfuly !!!");

    app.listen(PORT , () => {
        console.log(`server is listening on port: ${PORT}`);
    })
}).catch(error => console.log(error));

app.use("/api",route);
const express = require('express');
const app = express();
const fs = require('fs');
const { verifyToken } = require('./middleware/authMiddleware');
const mongoose = require('mongoose');
const cors=require('cors')
require('dotenv').config();
const routes = require('./routes/crud');
const projectRoutes = require('./routes/projectRoutes');

const { timeStamp } = require('console');
 app.use(cors())

app.use(express.json());

//  app.get("/divy",(req,res)=>{
// fs.readFile('backend.txt','utf8',(err,data)=>{
//   res.send(data)
// })
//  })

//  app.get("/home",(req,res)=>{
// fs.readFile('home.txt','utf8',(err,data)=>{
//   res.send(data)
// })
//  })

//  app.get("/about",(req,res)=>{
// fs.readFile('about.txt','utf8',(err,data)=>{
//   res.send(data)
// })
//  })

//  app.get("/student/:studentid",(req,res)=>{
//    res.send(`student id: ${req.params.studentid}`)
//  })

// app.get('/profile',verifyToken,(req,res)=>{
//    try{
//      const data="my bank details"
//      res.status(200).json(data)
//    }
//    catch(error){
//      res.status(400).json(error)
//    }
// })

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.use(routes);
app.use(projectRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server starteda at ${process.env.PORT}`);
});
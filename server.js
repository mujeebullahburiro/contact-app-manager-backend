// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World!\n');
// });
// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000/');
// });

// //Pass Response as a Json Formate
// app.get('/api/json-formate', (req, res)=>{
//   res.json({Name: "Muhammad Shoaib", Email : "shoaibburiro@gmail.com"});
// })
// //Pass Response as a Json Formate with satus code
// app.get('/api/json2-formate', (req, res)=>{
//   res.status(200).json({Name: "Mujeebllah Buriro", Email : "Mujeebburiro77@gmail.com"});
// })
// app.get('/api/contact', (req, res)=>{
//   res.send("Get All Contact");
// })




const express = require('express');
const { connect } = require('mongoose');
const connectionDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.port || 5000

connectionDB();
//Middleware for Json Object which we getting  from client
app.use(express.json()); //This provide us a Parser, which wil help us to parse the data stream that we recieve form the client on the server side 

//Here we used  Middleware in our express project
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/usersRoutes"))

//Here we used Custom Middleware for Error Handling
app.use(errorHandler);



app.listen(port, () => {
  console.log(`Server Is Runnning at http://localhost:${port}`);
});
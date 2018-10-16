const express = require ('express');

const app = express();

app.use((req, res, next)=> {
  console.log("Node Middleware");
  next ();
});

app.use ((req, res, next)=>{
  res.send('Testing express');
});

module.exports = app;

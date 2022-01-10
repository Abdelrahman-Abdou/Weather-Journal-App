
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require('express');

// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-Parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors')
app.use(cors());
// Initialize the main project folder

app.use(express.static('website'));
// Setup Server
const port= 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})





app.get('/allGet', function (req, res) {
  res.send(projectData);
  
})




app.post('/addPost', postData);

function postData(req, res){
res.send(projectData);

let newData=(req.body)

newEntry={

date: newData.date,

temp: newData.temp,

content: newData.content
}

projectData=newEntry;
//console.log (projectData)

}


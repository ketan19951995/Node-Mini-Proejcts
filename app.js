const express = require("express"); 
const bodyParser = require("body-parser"); 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://admin:admin@cluster0-9xr5f.mongodb.net/test?retryWrites=true'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: true})); 

app.post('/sign_up' , function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;
  
    var data = {
        "name" : name,
        "email": email,
        "pass" : pass,
        "phone" : phone,
    } 
    db.collection('details').insertOne(data , function(err,collection){
        if(err)throw err ;
        console.log("Record inserted successfully");
    });
    return res.redirect('signup_success.html');
})

app.get('/' , function(req,res){
    return res.redirect('index.html'); 
}).listen(3000);

console.log("Server listening at port 3000");

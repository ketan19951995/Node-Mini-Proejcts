const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/' , function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit' , (req,res)=>{
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({"responseCode" : 1 , responseDesc : "please select captcha"});
    }
    var secretKey = "6LcXHpQUAAAAAAkwQUPVfS2dxATsORyEcm_a8ykt";
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationUrl , function(error , response , body){
        body  = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
            return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
          }
          res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
        });
      });
      
      // This will handle 404 requests.
      app.use("*",function(req,res) {
        res.status(404).send("404");
      })

      // lifting the app on port 3000.
app.listen(3000 , ()=>{
    console.log("Running on port 3000");
});
var express = require('express');
var nodemailer = require('nodemailer');

    var app = express();
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "email_id",
            pass: "password"
        }
    }); 

    app.listen(3000,()=>{
        console.log("express started on port 3000");
    });

    app.get('/' , function(req,res){
        res.sendfile('index.html');
    });

     app.get('/send' , function(req,res){
        var mailoptions  = {
            to : req.query.to,
            subject : req.query.subject,
            text : req.query.text
        }
        console.log(mailoptions);
        smtpTransport.sendMail(mailoptions , function(error , response){
            if(error){
                console.log(error);
                res.end("error");
                }else{
                console.log("Message sent: " + response.message);
                res.end("sent");
                }
        })    
     });
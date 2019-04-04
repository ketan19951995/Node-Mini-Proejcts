var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views' , __dirname + '/views' );
app.engine('html' , require('ejs').renderFile);

app.use(session({secret : "sssshhhhh"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var sess ;
app.get('/'  ,function(req,res){
     console.log ( "session is " , req.session);
   sess = req.session;
  
    if(sess.email){
        res.redirect('/admin')
    }
    else {
        res.render('index.html');
    }
});

app.post('/login' , function(req,res){
    sess = req.session;

    sess.email = req.body.email;
    res.end('done');
});

app.get('/test', function(req,res){
    sess = req.session
    console.log("Session  for test  is" , sess);
    console.log( " tesr is "  , sess.email);
    res.end("ok");

});



app.get('/admin' , function(req,res){
    sess= req.session;
    console.log(sess.email);
    if(sess.email){
        res.write('<h1>Hello ' +sess.email + '</h1>');
       res.end('<a href="+">Logout</a>');
     }  
  else{
     res.write('<h1> Please login First');
     res.end('<a href = "+>Login</a>"');
  }
});

app.get('/logout' , function(req,res){
    res.session.destroy(function(err){
        if(err){
            console.log("error is " , err)
        }
        else {
            res.redirect('/');
        }
    });
});

app.listen(3000,function(){
    console.log("app started on Port 3000");
});






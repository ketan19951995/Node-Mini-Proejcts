const express = require('express');
var multer = require('multer');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));


var storage = multer.diskStorage({
    destination : function(req,file,callback){
        callback (null , './public/uploads');
    },
    filename : function(req,file,callback){
        callback(null , Date.now() + '.jpg' );
    }
});

var upload = multer({storage: storage});
app.post('/add' , upload.single('imagename') , function(req,res){
     var image = req.file.filename;
     var title = req.body.title;
});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/index.html'); 
});


app.listen(3000 , function() {
       console.log("Running succesfully");
});
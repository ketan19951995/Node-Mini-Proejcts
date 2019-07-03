const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


   var uri = 'mongodb+srv://notes:notes@cluster0-skv5f.mongodb.net/test?retryWrites=true&w=majority';
   var db = mongoose.connect(uri).catch((error) => { console.log(error); });

 app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
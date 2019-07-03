const Note =  require('../models/note.model.js');
//Create and save  a new note 
exports.create = (req, res) => {
    //   console.log("dsfsf");
    // Validate request
    console.log(req.body.content + "dfdf");
    if(!req.body.content) {
        
        
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

     console.log("NOte is " ,  note);
  
     note.save()
     .then(data => {
         res.send(data);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occurred while creating the Note."
         });
     });
   };
  
    



//Retrieve and return all notes from database 
exports.findAll =  (req,res)=>{
      Note.find().then(notes=>{
          res.send(notes);
      }).catch(err=>{
          res.status(500).send({
              message : err.message  || "Some errors occured while retrieving notes"
          });
      });
};


//Find a single note with noteid 
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

//Update  a  note identified by the noteID In the request 
exports.update =  (req,res)=>{
     if(!req.body.content){
         return res.status(400).send({
             message : "Note Content can not be empty"
         });
     }

     Note.findByIdAndUpdate(req.params.noteId ,  {
         title : req.body.title || "Untitiles note",
         content : req.body.content
     } , {new : true})
     .then (note=> {
            if(!note){
              return res.status(404).send({
                 message : "Not found with id " +  req.params.noteId
             });
        }
        res.send(note); 
    }).catch(err=>{
        if(err.kind  === 'ObjectId'){
            return res.status(404).send({
                message : "Notes not found with id"   +  req.params.noteId
            });
        }

        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
//Create and save  a new note 
exports.delete =  (req,res)=>{
         Note.findByIdAndRemove(req.params.noteId)
         .then(note=>{
             if(!note){
                 return res.status(404).send({
                     message :  "Note found with id"  + req.params.noteId

                 });
             }
             res.send({message : "Note deleted successfully"});
         }).catch(err=>{
             if(err.kind === 'ObjectId' || err.name === 'NotFound'){
                 return res.status(404).send({
                     message : "Not found with id "  + req.params.noteId
                 })
             }

             return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
        });
    });
};
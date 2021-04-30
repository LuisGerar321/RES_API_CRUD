var express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Note = require("../models/note.model.js")


let  notes  = [];

router.get("/", async ( request, response )  =>{
        // console.log(notes);
        // response.send("Hello");

        const allNotes = new Note({title:null, body:null});
        // await allNotes.findAll();

        // response.send(await allNotes.findAll());
        response.send([ "test1", "Luis"  ])
});
router.post("/", (req, res ) => { //Fine
        console.log("POST ROUTE REACHED");
        const note =  req.body;
        const noteID  = uuidv4();
        const UniqueNote = {...note, id: noteID };
        console.log(UniqueNote);
        notes.push(UniqueNote);
        res.send(`Note with title: ${note.title}  and id: ${noteID} was added to database`);
        const newNoteDB = new Note(note);
        newNoteDB.create( {title: newNoteDB.title, body: newNoteDB.body},res);
}); 
router.get("/:id" , async ( req, res ) =>{ //Fine
        const {id} = req.params;
        const foundNote = notes.find( (note) => {return note.id  === id});
        // res.send(foundNote);

        const foundNoteC  = new Note( {title:null, body:null} );
        await foundNoteC.findID( id );
        res.send( foundNoteC.getAtributes() );

});
router.delete("/:id", async (req, res)  => {
        const {id} =  req.params;
        notes =  notes.filter( (note)=> note.id !== id);
        const nodeDelete =  new Note({title:null, body:null});
        if(await nodeDelete.removeID(id)){
                res.send(`Note with the id ${id} was deleted!`)
        }else{
                res.send(`Note with the id ${id} was not able to be delated!`)

        }
});


router.delete("/", async (req, res)  => {
        // notes =  notes.filter( (note)=> note.id !== id);
        const nodeDelete =  new Note({title:null, body:null});
        if(await nodeDelete.removeAll()){
                res.send(`All elements was delated`)
        }else{
                res.send(`None item could be delated!`)

        }
});


//Working in that feature!!!!!!!
router.patch( "/:id", async (req, res) =>{
        const {id} = req.params;
        const { title, body} = req.body;
        // const note  =  notes.find( (note) => note.id === id );
        const foundNote =  new Note({title:null, body:null})
        
        if( title ){

                await foundNote.updateTitle(id, title)
        };
        // if(body){
        //         await note.updateBody(id, body)
        // };


        res.send(`Note with the ID ${id} has been updated\n `);
});

module.exports = router;
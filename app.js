var express  = require('express');
var bodyParser = require("body-parser");
var userRouters =  require("./app/routes/notes.js");
var cors = require("cors");


const app = express();
app.use(cors());
const PORT = 3000; 

app.use(bodyParser.json()); 


// parse requests of content-type: application/json
app.use("/notes", userRouters);

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (request, response) =>{
        console.log("[TEST]");
        response.send("Ending point of '/notes'. If you want to query all the data: '54.160.51.72/notes/', if you want to query a 'data 54.160.51.72/notes/:id' #1.");
})

// set port, listen for requests
app.listen(PORT, () => console.log(`Server Running on port:  http://localhost:${PORT}`)); 

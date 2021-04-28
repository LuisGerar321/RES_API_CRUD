var express  = require('express');
var bodyParser = require("body-parser");
var userRouters =  require("./app/routes/notes.js");


const app = express();
const PORT = 3000; 

app.use(bodyParser.json()); 

// parse requests of content-type: application/json
app.use("/notes", userRouters);

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (request, response) =>{
        console.log("[TEST]");
        response.send("Hello from HomePage.");
})

// set port, listen for requests
app.listen(PORT, () => console.log(`Server Running on port:  http://localhost:${PORT}`)); 

const sql = require("./db.js");

// constructor
const Note = function(note) {
        this.id = null;
        this.title = note.title;
        this.body = note.body;
        
};

const table = "notes";

Note.prototype.create = (newNote) =>{
        sql.query( `INSERT INTO ${table} SET ?`, newNote, (err, res) => {
                if (err) {
                  console.log("error:", err);
                //   result(err, null);
                  return;
                }
                this.id =  res.insertId;
                console.log("created note: ", { id: res.insertId, ...newNote });
                // result(null, { id: res.insertId, ...newNote });
        });
};




Note.prototype.findID = ( noteID )=> {
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table} WHERE idnew_table = ${noteID}`,  (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                reject(false);
                        }
                        //If I found the element
                        if(res.length){
                                this.title =  res[0].title;
                                this.body =  res[0].body;
                                this.id =  res[0].idnew_table;
                                console.log("found customer: ");
                                resolve(true);
                        }else{
                                this.title =  null;
                                this.body =  null;
                                this.id =  null;
                                reject(false)
                        }
                });
        })

}

Note.prototype.findAll = ( )=> {
        return new Promise(  (resolve, reject) => {
                sql.query( `SELECT * FROM ${table}`,  (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        //If I found the element
                        if(res.length){
                                console.log("notes: ",  res );
                                
                                const result = res.reduce( (accu = [], element)=> {
                                        accu =  [...accu].concat(element);
                                        return accu;
                                }, [])
                                console.log( result);
                                resolve(result);
                        }else{
                                this.title =  null;
                                this.body =  null;
                                this.id =  null;
                                resolve([])
                        }
                });
        })

}



Note.prototype.getAtributes =  () => {
        return { 
                id: this.id,
                title:   this.title,
                body: this.body
        };
}

Note.prototype.removeID =  ( id) =>{
        return new Promise((resolve, reject) =>{
                sql.query( `DELETE FROM ${table} WHERE idnew_table = ${id}`, (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });
        });
}
Note.prototype.removeAll=  ()=>{
        return new Promise( (resolve, reject) => {
                sql.query(`DELETE FROM ${table}`, (err,res) => {
                        if(err){
                                resolve(false);
                        }
                        resolve(true);
                })
        }) 
}

Note.prototype.updateTitle = (id, title)=>{
        return new Promise( (resolve, reject)=> {

                sql.query( `UPDATE ${table} SET title = '${title}' WHERE idnew_table = ${id}`, (err, res)=>{
                        if(err){
                                console.log("error: ", err);
                                resolve(false);
                        }
                        if( res.affectedRows == 0){
                                resolve(false);
                        }
                        resolve(true);
                });

        });
}
Note.prototype.updateBody = (id, body)=>{
        return new Promise( (resolve, reject)=> {

                sql.query( `UPDATE ${table} SET body = ${body} WHERE idnew_table = ${id}`,  (err, res)=>{
                        if(err){
                                resolve(false);
                        }
                        resolve(true); 
                });

                
        });
}

module.exports = Note;

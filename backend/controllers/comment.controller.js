const sql = require("../models/db");

exports.getAllComments = (req, res, next) => {
    console.log("COUCOU");
    sql.query("SELECT * FROM comment", (error, results) => {
        if (error) {
            res.status(500); 
            res.send("error getAllComments: ",error);
              
            return;
        } else {
            res.send(results);
            console.log("comments: GetAllComments", results);
        }
    });
};
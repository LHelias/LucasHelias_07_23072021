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

exports.addOneComment = (req, res, next) => {    
    sql.query("INSERT INTO comment VALUES (CURRENT_TIMESTAMP, ?, ?, ?);", [req.body.email, req.body.post_id, req.body.textcontent] , (error,results) => {
        if (error) {
            res.status(500)
            res.send(error.message);
        } else {
            res.status(201)
            res.send(results);
        }
    });
};
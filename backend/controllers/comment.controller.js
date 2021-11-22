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

exports.editComment = (req, res, next) => {
    console.log("COUCOU")
    console.log(req.body.creation_date)
    commentDate = new Date (req.body.creation_date);
    commentDate = commentDate.toISOString().split('T')[0]+' '+commentDate.toTimeString().split(' ')[0]

    console.log("commentDate: ", commentDate);
    console.log("req.body: ", req.body.textcontent);
    let textcontent= req.body.textcontent;

    sql.query("UPDATE comment SET textcontent = ? WHERE comment.creation_date = ? ;", [ textcontent, commentDate], (error,results, fields) => {
        if (error) {
            res.status(500)
            res.send(error.message);
        } else {
            res.status(200)
            res.send(results);
        }
    });
}
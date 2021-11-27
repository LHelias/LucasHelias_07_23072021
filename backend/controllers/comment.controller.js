const sql = require("../models/db");
const moment = require('moment');


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
    date = req.body.creation_date;
    date = moment(date).format('YYYY-MM-DD HH:mm:ss');
    
    // commentDate = commentDate.toISOString().split('T')[0]+' '+commentDate.toTimeString().split(' ')[0];
    // commentDate = commentDate.toISOString().slice(0, 19).replace('T', ' ');
   
    console.log("commentDate: ", date);
    console.log("req.body: ", req.body.textcontent);
    let textcontent= req.body.textcontent;

    sql.query("UPDATE comment SET textcontent = ? WHERE comment.creation_date = ? ;", [ textcontent, date], (error,results, fields) => {
        if (error) {
            res.status(500)
            res.send(error.message);
        } else {
            res.status(200)
            res.send(results);
        }
    });
}

exports.deleteOneComment = (req, res, next) => {
    
    sql.query ("DELETE FROM comment WHERE creation_date = ? AND post_id = ?;", [req.body.creation_date, req.body.post_id], (error, results, fields) => {
        if (error){
            console.log("error: ", error);
            res.status(500).send({
                message: error.sqlMessage
            });
            return;
        } else {
            res.send(results);
            console.log(results)
            console.log("deleted post");
        }
    });
}
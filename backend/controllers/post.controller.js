const sql = require("../models/db");
const { getAllComments } = require("./comment.controller");

// sql.query("SELECT `post`.`post_id`, `post`.`creation_date`, `post`.`user_id`, `post`.`textcontent`, `post`.`video_url`, `comment`.`creation_date` AS `comment_creation_date`, `comment`.`user_id` AS `comment_user_id`, `comment`.`post_id` AS `comment_post_id`, `comment`.`textcontent` AS `comment_textcontent` FROM `post` LEFT JOIN `comment` ON `comment`.`post_id` = `post`.`post_id` ORDER BY `post`.`post_id`", (error, results) => {



exports.getAll = (req, res, next) => {
    let posts = [];
    let comments = [];
    let user = [];
    sql.query("SELECT `post`.*, `user`.`firstname`, `user`.`lastname` FROM `post` LEFT JOIN `user` ON `post`.`user_id` = `user`.`email` ORDER BY post.creation_date; SELECT `comment`.*, `user`.`firstname`, `user`.`lastname` FROM `comment` LEFT JOIN `user` ON `comment`.`user_id` = `user`.`email` ORDER BY comment.creation_date; SELECT * FROM user WHERE email = ?",req.query.email, (error, results) => {
        if (error) {
            res.send(error);
            res.status(500);  
            return;
        } else {
            res.send(results);
            console.log("results: ", results)
            posts = results[0];
            comments = results[1];
            user = results[2][0];
            // console.log("posts: ", results[0]);
            // console.log("comments:", results[1]);
            
        }
    });    
};

exports.createNewPost = (req, res, next) => {
    const newPost = req.body;
    console.log(newPost);

    sql.query("INSERT INTO post SET ?", newPost, (error, results, fields) => {
        if (error){
            console.log("error: ", error);
            res.status(500).send({
                message: error.sqlMessage
            });
            return;
        } else {
            res.send(results);
            console.log(results)
            console.log("created post: ", { ...newPost});
        }
    });
}

exports.deleteOnePost = (req, res, next) => {
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
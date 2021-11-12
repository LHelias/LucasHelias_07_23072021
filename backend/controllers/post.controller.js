const sql = require("../models/db");
const { getAllComments } = require("./comment.controller");

// sql.query("SELECT `post`.`post_id`, `post`.`creation_date`, `post`.`user_id`, `post`.`textcontent`, `post`.`video_url`, `comment`.`creation_date` AS `comment_creation_date`, `comment`.`user_id` AS `comment_user_id`, `comment`.`post_id` AS `comment_post_id`, `comment`.`textcontent` AS `comment_textcontent` FROM `post` LEFT JOIN `comment` ON `comment`.`post_id` = `post`.`post_id` ORDER BY `post`.`post_id`", (error, results) => {



exports.getAll = (req, res, next) => {
    let posts = [];
    let comments = [];
    sql.query("SELECT * FROM post ORDER BY post.creation_date; SELECT `comment`.*, `user`.`firstname`, `user`.`lastname` FROM `comment` LEFT JOIN `user` ON `comment`.`user_id` = `user`.`email`;", (error, results) => {
        if (error) {
            res.send(error);
            res.status(500);  
            return;
        } else {
            res.send(results);
            console.log("results: ", results)
            posts = results[0];
            comments = results[1];
            console.log("posts: ", results[0]);
            console.log("comments:", results[1])
            
        }
    });
    
};

// SELECT * FROM comments WHERE post.post_id = comment.post_id ORDER BY comment.creation_date;
// exports.createPost = (req, res, next) => {
    
// }
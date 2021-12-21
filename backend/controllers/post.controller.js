const sql = require("../models/db");
const moment = require('moment');
const { getAllComments } = require("./comment.controller");


exports.getAll = (req, res, next) => {
    let posts = [];
    let comments = [];
    let user = [];
    sql.query("SELECT `post`.*, `users`.`firstname`, `users`.`lastname` , `users`.`profile_picture_url` FROM `post` LEFT JOIN `users` ON `post`.`user_id` = `users`.`email` ORDER BY post.creation_date DESC; SELECT `comment`.*, `users`.`firstname`, `users`.`lastname` FROM `comment` LEFT JOIN `users` ON `comment`.`user_id` = `users`.`email` ORDER BY comment.creation_date; SELECT `users`.`email` , `users`.`firstname`, `users`.`lastname`, `users`.`profile_picture_url` FROM users WHERE email = ?", req.query.email, (error, results) => {
        if (error) {
            res.send(error);
            res.status(500);
            return;
        } else {
            res.send(results);

            posts = results[0];
            comments = results[1];
            user = results[2][0];
        }
    });
};

exports.createNewPost = (req, res, next) => {
    const newPost = {
        user_id: req.body[0],
        textcontent: req.body[1],
        video_url: req.body[2]
    };

    sql.query("INSERT INTO post(creation_date,user_id,textcontent,video_url) VALUES (CURRENT_TIMESTAMP, ?, ?, ?);", [newPost.user_id, newPost.textcontent, newPost.video_url], (error, results, fields) => {
        if (error) {
            console.log("error: ", error);
            res.status(500).send({
                message: error.sqlMessage
            });
            return;
        } else {
            res.send(results);
            console.log(results)
            console.log("created post: ", { ...newPost });
        }
    });
};

exports.deletePost = (req, res, next) => {
    console.log(req.query);
    req.query.creation_date = moment(req.query.creation_date).format('YYYY-MM-DD HH:mm:ss');

    sql.query("DELETE FROM post WHERE creation_date = ? AND post_id = ? and user_id = ?;", [req.query.creation_date, req.query.postId, req.query.user_id], (error, results, fields) => {
        if (error) {
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
};

exports.editPost = (req, res, next) => {
    console.log("EDIT POST", req.body);
    req.body.creation_date = moment(req.body.creation_date).format('YYYY-MM-DD HH:mm:ss');

    sql.query("UPDATE post SET textcontent = ?, video_url = ? WHERE post.creation_date = ? AND post_id = ? AND user_id = ?;", [req.body.textcontent, req.body.video_url, req.body.creation_date, req.body.post_id, req.body.user_id], (error, results, fields) => {
        if (error) {
            console.log("error: ", error);
            res.status(500).send({
                message: error.sqlMessage
            });
            return;
        } else {
            res.send(results);
            if (results.affectedRows = 1) {
                console.log("Post édité !");
            }

        }
    });
};
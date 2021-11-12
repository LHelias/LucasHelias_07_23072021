const { error } = require("console");
const sql = require("../models/db");
const jwt = require("jsonwebtoken")
// const User = require("../models/user.model");


exports.createOne = (req, res, next) => {
  var newUserObject = req.body;
  console.log("type of newUserObject: ", typeof(newUserObject));
  console.log("newUserObject: ", newUserObject.email)
  var newUser = {
    email: newUserObject.email,
    password: newUserObject.password,
    firstname: newUserObject.firstname,
    lastname: newUserObject.lastname,
    profile_picture_url: newUserObject.profile_picture_url
  }
  
  sql.query("INSERT INTO user SET ?", newUser, (error, results, fields) =>{
    if(error) {
      console.log("error:", error);
      res.status(500).send({
        message: error.sqlMessage
      });
      return;
    }    
    else {
      res.send(results);
      console.log(results);
      console.log("created user: ", { ...newUser});
    }
  });
}

exports.getAll = (req, res, next) => {
    sql.query("SELECT * FROM user", (error, results) => {
      if (error) {
        console.log("error: getAll", error);
        res.status(500).send({
          message: ("error: getAll")
        });
        return;
      }
      else res.send(results);
      console.log("users: GetAll", res);
    });
};

exports.login = (req, res, next) => {

  sql.query("SELECT * FROM user WHERE email = ?", req.body.email, (error,results) => {
    if (error) {
      console.log("error login",error)
      res.status(500).send({
        message: ("error, could not find user" +  req.body.email )
      })
    }
    else {
      console.log("results[0]: ",results[0].password);
      if (req.body.password == results[0].password) {
        // res.send({
        //   message: `connexion à ${req.body.email} réussie`
        // });
        res.status(201).json({
          email: results[0].email,
          token: jwt.sign({email: results[0].email}, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
        })
      } else {
        res.status(401).send({message: "mot de passe incorrect"})
      }
    }
  });
}

exports.getUserProfile = (req, res, next) => {
  console.log(req.params.email)
  sql.query("SELECT * FROM user WHERE email = ?" , req.params.email, (error, results) =>{
    if (error) {
      res.status(500);
      console.log("error getOne: ", error)
      
    } else { 
      res.status(201);
      res.send(results[0]);
    }
  })
}

exports.modifyUserProfile = (req, res, next) => {
  console.log("modifyUserProfile");
  console.log("req.body: ", req.body.email);
  const userObject = req.body;
  sql.query (
    "UPDATE user SET email = ?, password = ?, firstname = ?, lastname = ?, profile_picture_url = ? WHERE email = ?", [req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.profile_picture_url, req.params.email], (error, results) => {
    if (error) {
      console.log("error", error);
      res.status(401)
    }
    else if (results.affectedRows == 0) {
      //impossible de trouver l'utilisateru avec l'email.
      res.status(500);
      res.send({message : `impossible de trouver l'utilisateur ${req.params.email}`})
    }
    else {
      console.log("updated user: ", results)
      res.status(201)
      res.send(results)
    }
  });
}
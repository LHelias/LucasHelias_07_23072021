const { error } = require("console");
const sql = require("../models/db");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


exports.createOne = (req, res, next) => {
  console.log("req CREATE ONE: ", req.body);

  var newUserObject = req.body;

  if (req.file) {
    newUserObject.profile_picture_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  };

  var newUser;

  newUserObject.email = newUserObject.email.toLowerCase(); // transforme les majuscules de l'adresse email en minuscules.

  bcrypt.hash(req.body.password, 10).then(hash => {
    newUser = {
      email: newUserObject.email,
      password: hash,
      firstname: newUserObject.firstname,
      lastname: newUserObject.lastname,
      profile_picture_url: newUserObject.profile_picture_url
    };
    console.log(newUser);
    sql.query("INSERT INTO users SET ?", newUser, (error, results, fields) => {
      if (error) {
        console.log("error:", error);
        res.status(500).send({
          message: error.sqlMessage
        });
        return;
      }
      else {
        res.send(results);
        console.log(results);
        console.log("created user: ", { ...newUser });
      }
    });
  });
}

exports.getAll = (req, res, next) => {
  sql.query("SELECT * FROM users", (error, results) => {
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

  sql.query("SELECT * FROM users WHERE email = ?", req.body.email, (error, results) => {
    if (error || results.length == 0) {
      console.log("error login", error)
      res.status(500).send({
        message: ("error, could not find user.")
      })
    }
    else if (results.length !== 0) {
      console.log("results :", results.length)
      console.log("results[0]: ", results[0].password);

      bcrypt.compare(req.body.password, results[0].password).then(valid => {
        if (!valid) {
          res.status(401).send({ message: "mot de passe incorrect" });
        }
        res.status(201).json({
          email: results[0].email,
          token: jwt.sign({ email: results[0].email }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
        })
      })
    }
  });
}

exports.getUserProfile = (req, res, next) => {
  console.log(JSON.stringify.req.query.email);
  sql.query("SELECT * FROM users WHERE email = ?", req.query.email, (error, results) => {
    if (error) {
      res.status(500);
      console.log("error getUserProfile: ", error)

    } else {
      res.status(201);
      res.send(results);
    }
  })
}

exports.modifyUserProfile = (req, res, next) => {
  console.log("modifyUserProfile");
  console.log("req.body: ", req.body.email);
  const userObject = req.body;
  sql.query(
    "UPDATE users SET email = ?, password = ?, firstname = ?, lastname = ?, profile_picture_url = ? WHERE email = ?", [req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.profile_picture_url, req.params.email], (error, results) => {
      if (error) {
        console.log("error", error);
        res.status(401)
      }
      else if (results.affectedRows == 0) {
        //impossible de trouver l'utilisateru avec l'email.
        res.status(500);
        res.send({ message: `impossible de trouver l'utilisateur ${req.params.email}` })
      }
      else {
        console.log("updated user: ", results)
        res.status(201)
        res.send(results);
      }
    });
}

exports.deleteUser = (req, res, next) => {
  console.log(req.body.u);
  sql.query("DELETE FROM users WHERE users.email = ?", req.body.email, (error, results) => {
    if (error) {
      console.log("error", error);
      res.status(401)
    } else if (results.affectedRows == 0) {
      //impossible de trouver l'utilisateru avec l'email.
      res.status(500);
      res.send(error)
    }
    else {
      console.log("deleted user: ", results)
      res.status(201)
      res.send(results);
    }
  });

}
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const isAdmin = false;

  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.email;

    if (userId === "admin@groupomania.com"){
      console.log("Welcome Admin");
      next();
    }
    else if (userId !== req.query.email) {
      console.log("Invalid user ID")
      throw 'Invalid user ID';
    } else {
      console.log("next");
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid auth'
    });
  }
};


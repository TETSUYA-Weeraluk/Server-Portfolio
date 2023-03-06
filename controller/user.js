var jwt = require("jsonwebtoken");
const secret = "welcometophuket";
const { connection } = require("../db");

const checkUser = (req, res) => {
  try {
    var decoded = jwt.verify(req.body.token, secret);
    const q = "SELECT * FROM users WHERE id_users = ?";
    connection.execute(q, [decoded.id], (err, data) => {
      if (data.length >= 0) {
        res.send({ token: req.body.token });
      } else {
        res.send({ message: "error" });
      }
    });
  } catch (err) {
    res.send({ error: err });
  }
};

const getUser = (req, res) => {
  try {
    const q = "SELECT * FROM users JOIN role ON users.id_role = role.id_role"
    connection.execute(q, (err, data) => {      
      const resData = data.map((dataUser) => ({
        id: dataUser.id_users,
        username: dataUser.username,
        fname: dataUser.fname,
        lname: dataUser.lname,
        email: dataUser.email,
        id_role: dataUser.id_role,
        name_role : dataUser.name_role,
      }));
      res.send(resData);
    });
  } catch (error) {
    res.send({ error: error });
  }
};

module.exports = {
  checkUser,
  getUser,
};

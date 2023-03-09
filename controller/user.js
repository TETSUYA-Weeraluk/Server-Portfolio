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

const getAllUser = (req, res) => {
  try {
    const q = "SELECT * FROM users JOIN role ON users.id_role = role.id_role";
    connection.execute(q, (err, data) => {
      const resData = data.map((dataUser) => ({
        id: dataUser.id_users,
        username: dataUser.username,
        fname: dataUser.fname,
        lname: dataUser.lname,
        email: dataUser.email,
        id_role: dataUser.id_role,
        name_role: dataUser.name_role,
      }));
      res.send(resData);
    });
  } catch (error) {
    res.send({ error: error });
  }
};

const getAllRole = (req, res) => {
  try {
    const q = "SELECT * FROM role";
    connection.execute(q, (err, data) => {
      if (err) {
        res.send({ error: err });
      }
      res.send(data);
    });
  } catch (error) {
    res.send({ error: error });
  }
};

const getUser = (req, res) => {
  console.log('getUser')
  const q = 
    "SELECT * FROM users JOIN role ON users.id_role = role.id_role WHERE username = ?";
  try {
    connection.execute(q, [req.body.username], (err, data) => {
      if (data.length <= 0) {
        res.send({ error: "user not found" });
      } else if (err) {
        res.send({ error: err });
      } else {
        const resData = {
          id: data[0].id_users,
          username: data[0].username,
          fname: data[0].fname,
          lname: data[0].lname,
          email: data[0].email,
          id_role: data[0].id_role,
          name_role: data[0].name_role,
        };
        res.send(resData);
      }
    });
  } catch (error) {
    res.send({ error: error });
  }
};

const updateUer = (req, res) => {
  const title = req.body.title;
  const currentValue = req.body.value;
  const editValue = req.body.valueEdit;
  const q = `UPDATE users SET ${title} = '${editValue}' WHERE ${title} = '${currentValue}'`;
  try {
    connection.execute(q, (err, data) => {
      if (err) {
        res.send({ error: err });
      } else if (data.changedRows === 0) {
        res.send({ message: "data not change" });
      } else {
        const q =
        `SELECT * FROM users JOIN role ON users.id_role = role.id_role WHERE ${title} = ?`;
        try {
          connection.execute(q, [editValue], (err, data) => {
            const resData = {
              id: data[0].id_users,
              username: data[0].username,
              fname: data[0].fname,
              lname: data[0].lname,
              email: data[0].email,
              id_role: data[0].id_role,
              name_role: data[0].name_role,
            };
            res.send(resData);  
          });
        } catch (error) {
          res.send({ error: error });
        }
      }
    });
  } catch (error) {
    res.send({ error: error });
  }
};

module.exports = {
  checkUser,
  getAllUser,
  getUser,
  getAllRole,
  updateUer,
};

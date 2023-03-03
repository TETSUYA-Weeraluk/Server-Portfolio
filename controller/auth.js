const bcrypt = require('bcrypt');
const {connection} = require('../db');

const register = (req, res) => {
  // เช็ค username , email
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";

  connection.execute(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Insert to database
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const q =
    `INSERT INTO users (username,fname,lname,email,password, id_role,create_time) \
       VALUES ('${req.body.username}','${hash}', '${req.body.fname}', '${req.body.lname}','${req.body.email}','1','${date}')`;

    connection.execute(q,(err,data) => {
        if (err) return res.json(err);
        return res.status(200).json('User has been created')
    })
  });
};

//test

module.exports = {
  register,
}
var jwt = require("jsonwebtoken");
const secret = "welcometophuket";
const {connection} = require('../db');

const checkUser = (req,res) => {
  try {
    var decoded = jwt.verify(req.body.token, secret);
    const q = 'SELECT * FROM users WHERE id_users = ?'
    connection.execute(q,[decoded.id],(err , data) => {
        if(data.length >= 0){
            res.send({token : req.body.token})
        }else{
            res.send({message : 'error'})
        }
    })
  } catch (err) {
    res.send({error : err})
  }
};

module.exports = {
    checkUser
}
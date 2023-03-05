const bcrypt = require('bcrypt');
const {connection} = require('../db');
var jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const secret = 'welcometophuket'
const register = (req, res) => {
  // เช็ค username , email
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";

  connection.execute(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //hash the password
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Insert to database
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const q =
    `INSERT INTO users (username,password,fname,lname,email,id_role,create_time) \
       VALUES ('${req.body.username}','${hash}', '${req.body.fname}', '${req.body.lname}','${req.body.email}','1','${date}')`;

    connection.execute(q,(err,data) => {
        if (err) return res.json(err);
        return res.status(200).json('User has been created')
    })
  });
};

const login = (req,res) => {
  const q = "SELECT * FROM users WHERE username = ?"
  
  //เช็คว่ามีผู้ใช้งานภายในฐานข้อมูลหรือไม่
  connection.execute(q,[req.body.username],(err,data) => {
    if(err) return res.send({error : err})
    // ถ้าข้อมูลน้อยกว่าเท่ากับ 0 (หรือไม่มีผู้ใช้ง้าน) ให้ส่ง error กลับไปและมีค่า user not found
    if(data.length <= 0) return res.send({error : "User not found"})
  
    //หากมีผู้ใช้งานมากว่า 0 (หรือมีภายในฐานข้อมูล)
    const checkpassword = async () => {
      const match = await bcrypt.compareSync(req.body.password, data[0].password)
      if(match){
        const token = jwt.sign({id:data[0].id_users}, secret);
        res.send({token : token})
      }else{
        res.send({error :'password is incorrect'})
      }
    }
    checkpassword();
  });
}


module.exports = {
  register,
  login
}
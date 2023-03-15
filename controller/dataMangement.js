const { connection } = require("../db");

const getAllDataManagement = (req , res) => {
    let dataSend = []
  const q ="SELECT * FROM hero";
    try {
        connection.execute(q,(err,data)=> {
            const q = "SELECT * FROM personalinfo"
            dataSend.push(data)
            connection.execute(q,(err,data) => {
                const q = "SELECT * FROM education"
                dataSend.push(data)
                connection.execute(q,(err,data) => {
                    dataSend.push(data)
                    res.send(dataSend)
                })
            })

        })
    } catch (error) {
        res.send({error : error})
    }
};

module.exports = {
    getAllDataManagement,
  };
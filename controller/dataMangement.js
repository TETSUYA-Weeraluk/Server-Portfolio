const { connection } = require("../db");

const getAllDataManagement = (req, res) => {
  const q = "SELECT * FROM icons_personal";
  const q_personal = "SELECT * FROM personal WHERE id_users = 1";
  const q_hero = "SELECT * FROM hero WHERE id_users = 1";
  const q_contact =
    "SELECT * FROM contact join contact_type ON contact.id_contact_type = contact_type.id_contact_type WHERE id_users = 1";
  const q_education = "SELECT * FROM education WHERE id_users = 1";
  const q_skill =
    "SELECT * FROM skill join skill_item on skill.id_skill_item = skill_item.id_skill_item";
  const q_project = "SELECT * FROM project WHERE id_users = 1";

  try {
    //Icons Personal
    connection.execute(q, (err, icons_personal, field) => {
      //Personal Info
      connection.execute(q_personal, (err, personal, field) => {
        // Data Hero
        connection.execute(q_hero, (err, hero, field) => {
          // Data personal_contact
          connection.execute(q_contact, (err, contact, field) => {
            // Data personal_education
            connection.execute(q_education, (err, education, field) => {
              // Data personal_skill
              connection.execute(q_skill, (err, skill, field) => {
                // Data personal_project
                connection.execute(q_project, (err, project, field) => {
                  const data = {
                    icons_personal: icons_personal,
                    personal: personal[0],
                    contact: contact,
                    education: education,
                    skill: skill,
                    hero: hero,
                    project: project,
                  };
                  res.send(data);
                });
              });
            });
          });
        });
      });
    });
  } catch (error) {
    res.send({ error: error });
  }
};

const updateDataManagement = (req, res) => {
  const table = req.body.table;
  const title = req.body.title;
  const value = req.body.value;
  const id_table = req.body.id_table;
  const id = req.body.id;

  const q = `UPDATE ${table} SET ${title} = "${value}" WHERE ${id_table} = ${id}`;
  // Update Data
  connection.execute(q, (err, data) => {
    if (err) return res.json(err);
    if (data.changedRows === 0) {
      res.send({ message: "data not change" });
    }
    // SELECT DATA
    else {
      const q = "SELECT * FROM icons_personal";
      const q_personal = "SELECT * FROM personal WHERE id_users = 1";
      const q_hero = "SELECT * FROM hero WHERE id_users = 1";
      const q_contact =
        "SELECT * FROM contact join contact_type ON contact.id_contact_type = contact_type.id_contact_type WHERE id_users = 1";
      const q_education = "SELECT * FROM education WHERE id_users = 1";
      const q_skill =
        "SELECT * FROM skill join skill_item on skill.id_skill_item = skill_item.id_skill_item";
      const q_project = "SELECT * FROM project WHERE id_users = 1";

      try {
        //Icons Personal
        connection.execute(q, (err, icons_personal, field) => {
          //Personal Info
          connection.execute(q_personal, (err, personal, field) => {
            // Data Hero
            connection.execute(q_hero, (err, hero, field) => {
              // Data personal_contact
              connection.execute(q_contact, (err, contact, field) => {
                // Data personal_education
                connection.execute(q_education, (err, education, field) => {
                  // Data personal_skill
                  connection.execute(q_skill, (err, skill, field) => {
                    // Data personal_project
                    connection.execute(q_project, (err, project, field) => {
                      const data = {
                        icons_personal: icons_personal,
                        personal: personal[0],
                        contact: contact,
                        education: education,
                        skill: skill,
                        hero: hero,
                        project: project,
                      };
                      res.send(data);
                    });
                  });
                });
              });
            });
          });
        });
      } catch (error) {
        res.send({ error: error });
      }
    }
  });
};

const insertDataManagement = (req, res) => {
  if (req.body.table === "") {
    console.log("ค่าว่าง");
    return;
  } else {
    const table = req.body.table;
    const column = req.body.column;
    const value = req.body.value;
    const q = `INSERT INTO ${table} (${column}) VALUES (${value});`;
    console.log(q);
    try {
      connection.execute(q, (err, data) => {
        if (err) return res.json(err);
        res.json("success");
      });
    } catch (error) {
      res.send({ error: error });
    }
  }
};

const selectItemSkill = (req, res) => {
  if (req.body.table === "") {
    console.log("ค่าว่าง");
    return;
  } else {
    const q = `SELECT * FROM skill_item`;
    try {
      connection.execute(q, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
      });
    } catch (error) {
      res.send({ error: error });
    }
  }
};

const insertItemSkill = (req, res) => {
  const id_users = req.body.value[0];
  const title = req.body.value[1];
  const imgSkill = req.body.value[2];
  const q_check_Title = `SELECT * FROM skill_item WHERE title = ${title}`;
  const q_insert = `INSERT INTO skill_item (title,icons_skill) VALUES (${title},${imgSkill})`;
  const q_select_lastInsert = `SELECT id_skill_item FROM skill_item WHERE title = ${title}`;
  const q_insert_itemSkill_users = `INSERT INTO skill (id_skill_item,id_users) VALUES (?,${id_users})`;
  try {
    connection.execute(q_check_Title, (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("Title already exists!");

      connection.execute(q_insert, (err, data) => {
        if (err) return res.json(err);
        connection.execute(q_select_lastInsert, (err, data) => {
          if (err) return res.json(err);
          connection.execute(
            q_insert_itemSkill_users,
            [data[0].id_skill_item],
            (err, data) => {
              if (err) return res.json(err);
              res.json("Success");
            }
          );
        });
      });
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAllDataManagement,
  updateDataManagement,
  insertDataManagement,
  selectItemSkill,
  insertItemSkill,
};

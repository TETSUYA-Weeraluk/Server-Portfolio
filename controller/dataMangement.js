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

module.exports = {
  getAllDataManagement,
  updateDataManagement,
};

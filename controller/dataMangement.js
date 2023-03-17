const { connection } = require("../db");

const getAllDataManagement = (req, res) => {
  const q = "SELECT * FROM icons_personal";
  try {
    connection.execute(q, (err, icons, test) => {
      const q = "SELECT * FROM personal";
      connection.execute(q, (err, personal, test) => {
        if (err) throw err;
        const q = "SELECT * FROM hero WHERE id_personal = ?";
        connection.execute(q, [personal[0].id_personal], (err, hero, test) => {
          if (err) throw err;
          const q = "SELECT * FROM education WHERE id_personal = ?";
          connection.execute(
            q,
            [personal[0].id_personal],
            (err, education, test) => {
              if (err) throw err;
              const q = "SELECT * FROM skill WHERE id_personal = ?";
              connection.execute(
                q,
                [personal[0].id_personal],
                (err, skill, test) => {
                  if (err) throw err;
                  const q = "SELECT * FROM project WHERE id_personal = ?";
                  connection.execute(
                    q,
                    [personal[0].id_personal],
                    (err, project, test) => {
                      if (err) throw err;
                      let link_email = {};
                      let link_phone = {};

                      if (personal[0].email !== "") {
                        link_email = {
                          value: personal[0].email,
                          icons: icons[2].link_img,
                          link: `mailto:${personal[0].email}`,
                        };
                      } else {
                        link_email = {
                          value: personal[0].email,
                          icons: icons[2].link_img,
                        };
                      }

                      if (personal[0].phone !== "") {
                        link_phone = {
                          value: personal[0].phone,
                          icons: icons[3].link_img,
                          link: `tel:${personal[0].email}`,
                        };
                      } else {
                        link_phone = {
                          value: personal[0].phone,
                          icons: icons[3].link_img,
                        };
                      }

                      const data = {
                        personal: {
                          id: personal[0].id_personal,
                          name: {
                            value: personal[0].name,
                            icons: icons[0].link_img,
                          },
                          date_of_birth: {
                            value: personal[0].date_of_birth,
                            icons: icons[1].link_img,
                          },
                          email: link_email,
                          phone: link_phone,
                          facebook: {
                            value: personal[0].facebook,
                            icons: icons[4].link_img,
                            link: personal[0].link_facebook,
                            column_link: "link_facebook",
                          },
                          line: {
                            value: personal[0].line,
                            icons: icons[5].link_img,
                            link: personal[0].link_line,
                            column_link: "link_line",
                          },
                          github: {
                            value: personal[0].github,
                            icons: icons[6].link_img,
                            link: personal[0].link_github,
                            column_link: "link_github",
                          },
                        },
                        hero: hero,
                        education: education,
                        skill: skill,
                        project: project,
                      };
                      res.send(data);
                    }
                  );
                }
              );
            }
          );
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
  connection.execute(q, (err, data) => {
    if (err) return res.json(err);
    if (data.changedRows === 0) {
      res.send({ message: "data not change" });
    } else {
      const q = "SELECT * FROM icons_personal";
      connection.execute(q, (err, icons, test) => {
        const q = "SELECT * FROM personal";
        connection.execute(q, (err, personal, test) => {
          if (err) throw err;
          const q = "SELECT * FROM hero WHERE id_personal = ?";
          connection.execute(
            q,
            [personal[0].id_personal],
            (err, hero, test) => {
              if (err) throw err;
              const q = "SELECT * FROM education WHERE id_personal = ?";
              connection.execute(
                q,
                [personal[0].id_personal],
                (err, education, test) => {
                  if (err) throw err;
                  const q = "SELECT * FROM skill WHERE id_personal = ?";
                  connection.execute(
                    q,
                    [personal[0].id_personal],
                    (err, skill, test) => {
                      if (err) throw err;
                      const q = "SELECT * FROM project WHERE id_personal = ?";
                      connection.execute(
                        q,
                        [personal[0].id_personal],
                        (err, project, test) => {
                          if (err) throw err;
                          let link_email = {};
                          let link_phone = {};

                          if (personal[0].email !== "") {
                            link_email = {
                              value: personal[0].email,
                              icons: icons[2].link_img,
                              link: `mailto:${personal[0].email}`,
                            };
                          } else {
                            link_email = {
                              value: personal[0].email,
                              icons: icons[2].link_img,
                            };
                          }

                          if (personal[0].phone !== "") {
                            link_phone = {
                              value: personal[0].phone,
                              icons: icons[3].link_img,
                              link: `tel:${personal[0].email}`,
                            };
                          } else {
                            link_phone = {
                              value: personal[0].phone,
                              icons: icons[3].link_img,
                            };
                          }

                          const data = {
                            personal: {
                              id: personal[0].id_personal,
                              name: {
                                value: personal[0].name,
                                icons: icons[0].link_img,
                              },
                              date_of_birth: {
                                value: personal[0].date_of_birth,
                                icons: icons[1].link_img,
                              },
                              email: link_email,
                              phone: link_phone,
                              facebook: {
                                value: personal[0].facebook,
                                icons: icons[4].link_img,
                                link: personal[0].link_facebook,
                                column_link: "link_facebook",
                              },
                              line: {
                                value: personal[0].line,
                                icons: icons[5].link_img,
                                link: personal[0].link_line,
                                column_link: "link_line",
                              },
                              github: {
                                value: personal[0].github,
                                icons: icons[6].link_img,
                                link: personal[0].link_github,
                                column_link: "link_github",
                              },
                            },
                            hero: hero,
                            education: education,
                            skill: skill,
                            project: project,
                          };
                          res.send(data);
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        });
      });
    }
  });
};

module.exports = {
  getAllDataManagement,
  updateDataManagement,
};

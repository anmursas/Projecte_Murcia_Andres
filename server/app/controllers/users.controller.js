const { USER } = require("../config/db.config.js");
const User = require("../models/user.model.js");
// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  User.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          data.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};
// Registar usuaris (per ara sense control de rols)
exports.create = (req, res) => {
    // Comprovem que el JSON no està buit
    if (!req.body) {
        res.status(400).send({
            message: "Les dades estan buides"
        });
    }

    // Creem el usuari
    const user = new User({
        dni: req.body.dni,
        username: req.body.username,
        password: req.body.password,
        full_name: req.body.full_name
    });

    // Ara el guardem a la base de dades ( deuriem de comparar el dni amb el de la taula de dnis per vore si és professor o alumne)
    User.create(user, (err,data) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "Error creant un usuari"
        });
        else res.send(data);
    })
}

exports.login = (req, res) => {
    const { username, password } = req.body;
    let role;
    
    User.login(username, password, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
              res.status(404).send({ message: 'User no encontrado'})
          } else {
              res.status(500).send({ message: 'Error devolviendo user'})
          }
      } if (data) {
          console.log("Data OK")
          res.status(200).send(data)
      }
  })
}


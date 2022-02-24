const sql = require("./db.js");
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'AccesTokenPass';
const refreshTokenSecret = 'RefreshTokenPass';

// Constructor
const User = function(t) {
    this.username = t.username;
    this.password = t.password;
    this.full_name = t.full_name;
    this.avatar = t.avatar;
};

User.getAll = (result) => {
    let query = "SELECT * FROM users";
    
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(true, err);
            return;
        }
        console.log("users: ", res)
        result(null,res);
    });
};

User.create = (newUser, result) => {
    console.log("DNI: " + newUser.dni);
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err );
            result(err, null);
            return;
        }
        console.log("Usuario creado: ", { id: res.insertId, ...newUser});
        result(null, { id: res.insertId, ...newUser});
    });

    // let query = "SELECT dni FROM dni_profe WHERE dni = '28656830A'";
    
    // sql.query(query, (err, res) => {
    //     if (err) {
    //         console.log("error: ", err);
    //         result(true, err);
    //         return;
    //     }
    //     console.log("users: ", res)
    //     result(null,res);
    // });
}

User.login = (username, password, result) => {
    sql.query(`SELECT id FROM users WHERE username = '${username}' and password = '${password}'`, (err, res) => {
        if (err) {
            result(true, err);
        } 
        if (res.length) {
            console.log(res);
        sql.query(`SELECT id_profe FROM professor WHERE id_profe = '${res[0]["id"]}'`, (err_user, res_profe) => {
                if (err_user) {
                    console.log("error: ", err_user);
                    result(true, err_user);
                } else {
                    let role = "";
                    if (res_profe.length) {
                        role = "profe";
                    } else {
                        role = "alumne";
                    }
                    const accessToken = jwt.sign(
                        {
                            "user_id": res[0]["id"],
                            "username": username,
                            "role": role
                        },
                        accessTokenSecret, {
                            "expiresIn": "1m"
                        }
                    );
                    result(null, {
                        "ok":true,
                        "data":accessToken
                    });
                }
            });
        }
        else { // res is null
            result({ kind: "not_found"},null);
        }
    });
};
module.exports = User
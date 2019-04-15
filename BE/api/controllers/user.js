const sqlite3 = require('sqlite3').verbose();
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.users_get_all = (request, response) => {
    let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err)
            console.error(err.message);
        else
            console.log('Connected to the database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM user`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            response.json(row);
        });
    });
    db.close();
};

exports.users_post =  (request, response) => {

    bcrypt.hash(request.body.pass, 10, (err, hash) => {
        console.log(hash)
        if (err) {
            response.status(500).json({
                message: err.message
            })
        } else {
            let user = new User(request.body.first_name,
                request.body.last_name,
                request.body.login,
                hash,
                request.body.roleId)

            console.log(user)

            let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Connected to the database. post');
            });

            let query = `INSERT INTO user (first_name, last_name, login, pass, roleId)
                        VALUES (`+ "'" + user.userFirstName + "'" + `,` + "'" + user.userLastName + "'"
                + `,` + "'" + user.userLogin + "'" + `,` + "'" + user.userPass + "'" + `,` + "'" +
                user.userRole + "'" + `)`;

            db.serialize(() => {
                db.all(`SELECT * FROM user where login =` + "'" + user.userLogin + "'", (err, row) => {

                    if (err)
                        console.error(err.message);
                    if (row.length >= 1)
                        response.json({ message: "login already exists" })
                    else {
                        let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                            console.log('Connected to the database. post');
                        });

                        db.run(query, (err, row) => {
                            if (err) {
                                console.error(err.message);
                            }
                            response.json({ message: "Ok!" });
                        });
                    };
                });
            });

            db.close();
        }
    });
}
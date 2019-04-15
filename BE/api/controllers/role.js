const sqlite3 = require('sqlite3').verbose();

exports.roles_get_all = (request, response) => {
    let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err)
            console.error(err.message);
        else
            console.log('Connected to the database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM role`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            response.json(row);
        });
    });
    db.close();
};
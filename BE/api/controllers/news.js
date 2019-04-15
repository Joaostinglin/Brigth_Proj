const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const jsonParse = require('../middleware/json-parse-requestBody')
const News = require('../models/news');
const ADMIN_ROLE = 1

exports.news_get_all = (request, response) => {

    const requestBody = jsonParse.convertToJson(request.body)

    console.log(requestBody)

    let query = '';

    if (requestBody.role == ADMIN_ROLE)
        query = `SELECT * FROM news n JOIN user u on n.userId = u.user_id`
    else
        query = `SELECT * FROM news n JOIN user u on n.userId = u.user_id where n.status = 2`

    let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err)
            console.error(err.message);
        else
            console.log('Connected to the database.');
    });

    db.serialize(() => {
        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            response.json(row);
        });
    });
    db.close();
};


exports.news_post = (request, response) => {

    let news = new News(request.body.title, request.body.content, request.body.status, request.body.userId);

    let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database. post');
    });

    let query = `INSERT INTO news (title, content, status, userId)
   VALUES (`+ "'" + news.title + "'" + `,` + "'" + news.content + "'" + `,` + "'" + news.status + "'" + `,` + "'" + news.userId + "'" + `)`;

    db.run(query, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        response.json({ message: "ok!" });
    });

    db.close();
};


exports.news_get_my_news = (request, response) => {
    let userId = request.body.user_id;
    let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err)
            console.error(err.message);
        else
            console.log('Connected to the database.');
    });

    db.serialize(() => {
        db.all(`SELECT * FROM news where userId =` + "'" + userId + "'", (err, row) => {
            if (err) {
                console.error(err.message);
            }
            response.json(row);
        });
    });
    db.close();
};
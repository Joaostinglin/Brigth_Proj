const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const jsonParse = require('../middleware/json-parse-requestBody')

const Login = require('../models/login');

exports.login_ = (request, response) => {

    let requestBodyJson = jsonParse.convertToJson(request.body);
    const loginUser = new Login(requestBodyJson.login, requestBodyJson.pass);
    

    let db = new sqlite3.Database('brigth.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    let query = `select * from user where login =` + "'" + loginUser.userLogin + "'";

    db.all(query, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        if (row.length < 1) {
            response.status(401).json({ message: "Unauthorized" })
        }
        else {
            bcrypt.compare(loginUser.userPass, row[0].pass, (error, result) => {
                if (!result) {
                    response.status(401).json({ message: "Unauthorized" })
                }
                else {
                    const token = jwt.sign({
                        login: row[0].login
                    }, 'secret', {
                            expiresIn: "1h"
                        })
                    response.status(200).json({ message: "Authorized", token: token, userId: row[0].user_id, roleId: row[0].roleId })
                }
            })
        }
    });

    db.close();
};
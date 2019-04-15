const express = require('express');
const app = express();

const roleRoute = require('./api/routes/role')
const userRoute = require('./api/routes/user')
const newsRoute = require('./api/routes/news')
const loginRoute = require('./api/routes/login')


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Accept, Authorization'
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use('/role', roleRoute)
app.use('/user', userRoute)
app.use('/news', newsRoute)
app.use('/login', loginRoute)

module.exports = app;
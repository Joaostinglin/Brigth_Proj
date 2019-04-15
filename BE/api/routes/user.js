const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user')

router.get('/', usersController.users_get_all);
router.post('/', usersController.users_post);

module.exports = router
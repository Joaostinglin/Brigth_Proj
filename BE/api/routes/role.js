const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const roleController = require('../controllers/role');

router.get('/', checkAuth,roleController.roles_get_all);


module.exports = router;
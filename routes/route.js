const express = require('express')
const router = express.Router();

//Importing controllers
const { users,updateUsers } = require('../controllers/controller');

router.get('/users', users)
router.put('/updateUsers', updateUsers)

module.exports = router
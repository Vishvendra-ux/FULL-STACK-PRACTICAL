const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/getusers',userController.getUsers)
router.post('/addUser',userController.addUser)
router.get('/logs',userController.getLogs);
router.get('/clearLogs',userController.clearLogs);
router.get('/serverInfo',userController.serverInfo);


module.exports = router;
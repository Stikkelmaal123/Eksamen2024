const express = require('express');
const router = express.Router();
const stackController = require('../controllers/stackController');
const groupController = require('../controllers/groupController');
router.get('/stacks', stackController.getStacks);
router.get('/groups', groupController.getStacks);
router.get('/createStack', stackController.renderCreateStackForm);
// router.get('/login', stackController.login);
router.post('/stacks/create', stackController.createStack);



module.exports = router;

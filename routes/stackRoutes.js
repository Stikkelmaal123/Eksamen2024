const express = require('express');
const router = express.Router();
const stackController = require('../controllers/stackController');
const groupController = require('../controllers/groupController');
router.get('/stacks', stackController.getStacks);
router.get('/groups', groupController.getAllGroups);
router.get('/create-group', groupController.getCreateGroupPage);
router.post('/create-group', groupController.createGroup);
router.get('/create-stack', stackController.renderCreateStackForm); 
router.post('/create-stack', stackController.createStack);


module.exports = router;

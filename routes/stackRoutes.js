const express = require('express');
const router = express.Router();
const stackController = require('../controllers/stackController');
const groupController = require('../controllers/groupController');
const isAdmin = require('../isAdmin');
router.get('/stacks', stackController.getStacks);
router.get('/groups', isAdmin, groupController.getAllGroups);
router.get('/create-group', isAdmin, groupController.getCreateGroupPage);
router.post('/create-group', isAdmin, groupController.createGroup);
router.get('/create-stack', stackController.renderCreateStackForm); 
router.post('/create-stack', stackController.createStack);
router.post('/stacks/start', stackController.startStack);
router.post('/stacks/stop', stackController.stopStack);
router.post('/api/templates', stackController .addTemplate);
router.post('/add-user', stackController.createUser);
router.delete('/stacks/delete', isAdmin, stackController.deleteStack);


module.exports = router;

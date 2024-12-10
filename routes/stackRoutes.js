const express = require('express');
const router = express.Router();
const stackController = require('../controllers/stackController');
router.get('/stacks', stackController.getStacks);
router.get('/createStack', stackController.renderCreateStackForm);
router.post('/stacks/create', stackController.createStack);



module.exports = router;

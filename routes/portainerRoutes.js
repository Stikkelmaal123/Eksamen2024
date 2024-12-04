const express = require('express');
const router = express.Router();
const portainerController = require('../controllers/portainerController');
router.get('/stacks', portainerController.getStacks);
router.get('/createStack', portainerController.renderCreateStackForm);
router.post('/stacks/create', portainerController.createStack);


module.exports = router;

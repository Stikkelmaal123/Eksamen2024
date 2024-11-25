const express = require('express');
const router = express.Router();
const portainerController = require('../controllers/portainerController');

// Route til at teste forbindelse
router.get('/portainer', portainerController.getPortainerInfo);

module.exports = router;

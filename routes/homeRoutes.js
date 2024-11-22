const express = require('express');

const homeControllers = ('../controllers/homeController');

const router = express.Router();
router.get('/', homeControllers.getHomepage);

module.exports = router
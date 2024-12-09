const express = require('express');
const homeControllers = require('../controllers/homeController');
const isAuthenticated = require('../middleware/auth');
const router = express.Router();


/*router.get('/', isAuthenticated, homeControllers.getHomepage);*/
router.get('/', (req, res) => {
    res.render('index', {title:'Home', message:'Welcome to the homepage'});
});

module.exports = router;
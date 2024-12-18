const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/login', authController.getLoginPage); // Render login page
router.post('/login', authController.postLogin); // Handle login form submission
router.get('/logout', authController.logout); // Handle logout
router.get('/password', authController.getForgotPasswordPage); // GET route for the forgot password page
router.post('/password', authController.postForgotPassword); // POST route for handling the forgot password form
router.post('/logout', authController.logout);

module.exports = router;
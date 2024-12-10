const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLoginPage); // Render login page
router.post('/login/auth', authController.postLogin); // Handle login form submission
// router.get('/logout', authController.logout); // Handle logout
// router.get('/password', authController.getForgotPasswordPage); // GET route for the forgot password page
router.post('/password', authController.postForgotPassword); // POST route for handling the forgot password form

module.exports = router;
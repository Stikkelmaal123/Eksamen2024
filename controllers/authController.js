const { getUserByEmailAndPassword } = require('../models/user');
const portainerApi = require('../utils/portainerApi'); 

exports.getLoginPage = (req, res) => {
    res.render('login', { layout: 'main2' });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate user credentials
        const user = await getUserByEmailAndPassword(email, password);
        if (!user) {
            // Invalid credentials
            return res.render('login', {
                layout: 'main2',
                title: 'Log In',
                message: 'Invalid credentials, please try again.',
            });
        }
        const token = await portainerApi.login();
        req.session.userId = user.user_id;
        req.session.groupId = user.group_id;
        req.session.isAdmin = user.admin === 1;

        res.status(200).json({
        message: 'Login successful',
        token,
        redirect: '/stacks',
    });
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', {
            layout: 'main2',
            title: 'Log In',
            message: 'An error occurred. Please try again later.',
        });
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).json({ message: 'Failed to log out.' });
        }

        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logged out successfully.' });
    });
};


exports.getForgotPasswordPage = (req, res) => {
    res.render('password', { layout: 'main2'});
};


exports.postForgotPassword = (req, res) => {
    const { email } = req.body;

    // Implement your password reset logic here (e.g., send email)
    // Example: Sending a message back for now
    res.render('password', { 
        title: 'Forgot Password', 
        message: `A password reset link has been sent to ${email}.` 
    });
};


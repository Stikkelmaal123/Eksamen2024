const { getUserByEmailAndPassword } = require('../models/user');
const { login: portainerLogin } = require('../utils/portainerApi');


exports.getLoginPage = (req, res) => {
    res.render('login', { title: 'Log In' });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        //  Validate user credentials
        const user = await getUserByEmailAndPassword(email, password);

        if (!user) {
            return res.render('login', {
                title: 'Log In',
                message: 'Invalid credentials, please try again.',
            });
        }

        // Authenticate with Portainer API
        const portainerToken = await portainerLogin('alpha', 'Ladida.12');

        // Store user and token in session
        req.session.user = { id: user.id, email: user.email };
        req.session.portainerToken = portainerToken;

        // Redirect to the homepage
        res.redirect('/stacks');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', {
            title: 'Log In',
            message: 'An error occurred. Please try again later.',
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login'); // Redirect to login after logout
    });
    res.redirect('/auth/login');
};

exports.getForgotPasswordPage = (req, res) => {
    res.render('password', { title: 'Forgot Password' });
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
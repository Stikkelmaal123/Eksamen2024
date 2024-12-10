
const portainerApi = require('../utils/portainerApi');

exports.login = async (req, res) => {
    try {
        const token = await portainerApi.login(username, password);

        if (token) {
            // Send the token back to the client
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getLoginPage = (req, res) => {
    res.render('login', { title: 'Log In' });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
/*
    // Replace with your authentication logic
    if (email === 'test@example.com' && password === 'password') {
        req.session.user = { email }; // Store user info in session
        return res.redirect('/'); // Redirect to homepage after login
    } else {
        res.render('login', { title: 'Log In', message: 'Invalid credentials, please try again.' });
    }/
   res.redirect('/');
};

exports.logout = (req, res) => {
   / req.session.destroy(() => {
        res.redirect('/auth/login'); // Redirect to login after logout
    });*/
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
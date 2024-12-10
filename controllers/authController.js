exports.getLoginPage = (req, res) => {
    res.render('login', { layout: 'main2'});

};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === 'test@example.com' && password === 'password') {
        req.session.user = { email }; // Store user info in session
        return res.redirect('/'); // Redirect to homepage after login
    } else {
        res.render('login', { title: 'Log In', message: 'Invalid credentials, please try again.' });
    }
   res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login'); // Redirect to login after logout
    });
    res.redirect('/auth/login');
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
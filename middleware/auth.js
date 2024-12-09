/*const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) { // Replace with your session/cookie logic
        next(); // User is authenticated, continue to the route
    } else {
        res.redirect('/auth/login'); // Redirect to the login page
    }
};*/

module.exports = (req, res, next) => {
    next(); // Allow access to the route
};
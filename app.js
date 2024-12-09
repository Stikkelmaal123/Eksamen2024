const express = require('express');
const exphbs = require('express-handlebars');
const stackRoutes = require('./routes/stackRoutes');
const dateHelper = require('./public/helpers/dateHelper');
const authRoutes = require('./routes/authRoutes');
/*const session = require('express-session');*/

const app = express();
const PORT = 3000;

app.engine('hbs', exphbs.engine({
    extname: 'hbs',         // Use `.hbs` extension for Handlebars files
    defaultLayout: 'main',  // Set default layout
    layoutsDir: 'views/layouts/', // Specify layouts directory
    helpers: {
        formatDate: dateHelper.formatDate
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'views');  // Specify views directory

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Routes
app.use('/', stackRoutes);
app.use ('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

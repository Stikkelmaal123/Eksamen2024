const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const stackRoutes = require('./routes/stackRoutes');
const dateHelper = require('./public/helpers/dateHelper');
const authRoutes = require('./routes/authRoutes');
const { getToken } = require('./utils/tokenStore');
const formatSubdomain = require('./public/helpers/formatSubdomain');

const app = express();
const PORT = 3000;


app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/', 
    helpers: {
        formatDate: dateHelper.formatDate,
        formatUrl: formatSubdomain.formatUrl,
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'views');  // Specify views directory


// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "sessionSecret", 
        resave: false,           
        saveUninitialized: true, 
        cookie: {
            secure: false,        
            maxAge: 1000 * 60 * 60, 
        },
    })
);
app.use((req, res, next) => {
    res.locals.isAdmin = req.session.isAdmin || false; 
    next();
});
const authenticateUser = async (req, res, next) => {
    try {
        const token = await getToken(); // Retrieve token
        if (!token) {
            console.error('Unauthorized: Token not found');
            return res.redirect('/login'); // Redirect to login and terminate further processing
        }
        next(); // Token exists, proceed to the next middleware or route
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.redirect('/login'); // Redirect on error and terminate processing
    }
};

// Routes
app.use('/', authRoutes);
app.use('/', authenticateUser, stackRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

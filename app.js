const homeRoutes = require('./routes/homeRoutes');
const express = require('express');
const exphbs = require('express-handlebars');
const authRoutes = require('./routes/authRoutes');
/*const session = require('express-session');*/

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

/*app.use(session({
    secret: 'your-secret-key',   // Secret key to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }    // In production, set `secure: true` if using https
}));*/

// Configure Handlebars
app.engine('hbs', exphbs.engine({
    extname: 'hbs',         // Use `.hbs` extension for Handlebars files
    defaultLayout: 'main',  // Set default layout
    layoutsDir: 'views/layouts/', // Specify layouts directory
}));
app.set('view engine', 'hbs');
app.set('views', 'views');  // Specify views directory

app.use(express.static('public'));

// Routes
app.use ('/',homeRoutes);
app.use ('/auth',authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


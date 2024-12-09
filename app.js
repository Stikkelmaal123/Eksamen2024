const express = require('express');
const exphbs = require('express-handlebars');
const stackRoutes = require('./routes/stackRoutes');
const pageRoutes = require('./routes/pageRoutes');
const dateHelper = require('./public/helpers/dateHelper');

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

// Routes
app.use('/', stackRoutes);
app.use('/', pageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

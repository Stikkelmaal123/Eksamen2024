const express = require('express');
const exphbs = require('express-handlebars');
const stackRoutes = require('./routes/stackRoutes');
const dateHelper = require('./public/helpers/dateHelper');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/', 
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
app.use('/', authRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

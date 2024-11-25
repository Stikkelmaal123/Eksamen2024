const express = require('express');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/homeRoutes');
const portainerRoutes = require('./routes/portainerRoutes');

const app = express();
const PORT = 3000;

// Configure Handlebars
app.engine('hbs', exphbs.engine({
    extname: 'hbs',         // Use `.hbs` extension for Handlebars files
    defaultLayout: 'main',  // Set default layout
    layoutsDir: 'views/layouts/', // Specify layouts directory
}));
app.set('view engine', 'hbs');
app.set('views', 'views');  // Specify views directory

// Middleware to serve static files
app.use(express.static('public'));

// Routes
app.use('/', homeRoutes);
app.use('/', portainerRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

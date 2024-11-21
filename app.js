const express = require('express');
const exphbs = require('express-handlebars');

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

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome', message: 'Hello, Handlebars!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

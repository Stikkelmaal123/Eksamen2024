exports.getHomePage = (req, res) => {
    res.render('index', { title: 'Welcome', message: 'Hello, MVC with Handlebars!'});
}
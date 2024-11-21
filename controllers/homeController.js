exports.getHomePage = (req, res) => {
  res.render('index', { title: 'Hello', message: 'This is a test'});
}
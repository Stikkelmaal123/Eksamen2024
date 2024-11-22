exports.getHomepage = (req,res) => {
  res.render(index, { title: 'Welcome', message: 'Hello, Handlebars!' })
};
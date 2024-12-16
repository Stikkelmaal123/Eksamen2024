const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        return next(); 
    }
    console.error('Authorization error: User is not an admin.');
    return res.status(403).render('error', { 
        message: 'Access denied. Admins only.', 
        layout: 'main2' 
    }); 
};

module.exports = isAdmin;

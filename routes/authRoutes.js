// const express = require('express');
// const authController = require('../controllers/authController');
// const router = express.Router();

// router.get('/login', authController.getLoginPage); // Render login page
// router.post('/login', authController.postLogin); // Handle login form submission
// router.get('/logout', authController.logout); // Handle logout
// router.get('/password', authController.getForgotPasswordPage); // GET route for the forgot password page
// router.post('/password', authController.postForgotPassword); // POST route for handling the forgot password form
// router.post('/logout', authController.logout);

// module.exports = router;
const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { addUser } = require('../models/user'); 
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload-users', upload.single('file'), async (req, res) => {
    try {
        const users = [];

        // Læs CSV-filen
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                users.push({
                    name: row.name,
                    email: row.email,
                    password: row.password, 
                    role: row.role || 0, 
                });
            })
            .on('end', async () => {
                try {
                    for (const user of users) {
                        await addUser(user.name, user.email, user.password, user.role);
                    }

                    fs.unlinkSync(req.file.path);

                    res.json({ success: true, message: 'Users imported successfully!' });
                } catch (error) {
                    console.error('Error adding users:', error);
                    res.status(500).json({ error: 'Failed to add users.' });
                }
            });
    } catch (error) {
        console.error('Error uploading CSV:', error);
        res.status(500).json({ error: 'Failed to process CSV file.' });
    }
});

const db = require('../utils/db');

router.get('/search-users', async (req, res) => {
    try {
        const searchTerm = req.query.q;

        let query = `
            SELECT user_id, user_name, email 
            FROM users 
        `;

        let params = [];

        if (searchTerm) {
            query += `WHERE user_name LIKE ? OR email LIKE ?`;
            params = [`%${searchTerm}%`, `%${searchTerm}%`];
        }

        const [users] = await db.query(query, params);

        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Failed to search users' });
    }
});


module.exports = router;
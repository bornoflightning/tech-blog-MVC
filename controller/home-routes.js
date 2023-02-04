const router = require('express').Router();
const authorized = require('../utils/authorized');
//your models will store the data for each post in an object and retrieve it here
const { User, Post, Comment } = require('../models');

// route to get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homePage', {posts, logged_in: req.session.logged_in})
    } catch (error) {
        res.status(500).json(error)
    }
});








module.exports = router;
const router = require('express').Router();
//your models will store the data for each post in an object and retrieve it here
const Post = require('../models/Post');

// route to get all posts
router.get('/', async(req, res) => {
    const postData = await Post.findAll().catch((error) => {
        res.json(error);
    });
        const posts = postData.map((post) => post.get({plain: true}));
        res.render('all', {posts});
});

// route to get only one post

router.get('/dish/:id', async (req, res) => {
    try {
        const postData = awat.Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({message: 'There was no post with that id.'});
            return;
        }
        const post = postData.get({plain: true});
        res.render('post', post);
    } catch (error) {
        res.status(500).json('there was an error, here are the details: ' + error);
    }
    
})
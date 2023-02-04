const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/authorized');

//this route handles posts, the post is referenced by id
router.get('/:id', async (req, res) => {
    try {
        const postInfo = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['description', 'date_created'],
                    include: [
                        {                        
                            model: User,
                            attributes: ['username']
                        }
                    ]
                },
            ]
        });
        
        console.log(postInfo);

        const post = postInfo.get({ plain: true });
        res.render('post', {...post,logged_in: req.session.logged_in});
    } catch (error) {
        res.status(500).json(error)
    }
})

//this route handles comments/posts
router.post('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    try {
        const newComment = await Comment.create({
            
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            comment: req.body.comment
        });

        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;
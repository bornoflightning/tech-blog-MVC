const router = require('express').Router();

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        console.log(postData);

        // we use the .get({plain: true}) on the object to serialize it so that it only includes the data we need.
        const post = postData.get({plain: true});
        // then we render the post template into the template
        res.render('post', post);
    } catch (error) {
        res.status(500).json("looks like there was an error. Here are the details: " +  error);
    }
})
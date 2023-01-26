const router = require('express').Router();

router.post('/', async (req, res)=> {
    try {
        const postData = await Post.create({
            post_title: req.body.post_title,
            content: req.body.content,
            author_name: req.body.author,
            post_date: req.body.post_date
        });
        res.status(500).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});

// updating a post
router.put('/:id', async (req, res)=>{
    try {
        const postData = await Post.update({
            post_title: req.body.post_title,
            content: req.body.content,
            author_name: req.body.author,
            post_date: req.body.post_date
        },
        {
            where: {
                id: req.params.id
            }
        });
        res.status(500).json(postData);
    } catch (error) {
        
    }
})




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
const router = require('express').Router();

const users = require('./userRoutes.js');
const posts = require('./postRoutes.js')



router.use('/users', users)
router.use('/posts', posts)
// router.use(`/comments`, require(`./comment-routes.js`))

module.exports = router;
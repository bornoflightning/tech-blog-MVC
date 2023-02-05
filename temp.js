// const router = require("express").Router();
// const { User } = require("../../models");
// const authorized = require('../../utils/authorized');




// //Render sign up page
// router.get('/signup', async (req, res) => {
//     try {
//         res.render('signup')
//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

// // this route creates a new user/signup
// router.post('/signup', async (req, res) => {
//     try {
//         const userInfo = await User.create({
//             username: req.body.username,
//             password: req.body.password,
            
//         });
//         req.session.save(() => {
//             req.session.loggedIn = true;
//             req.session.userId = userInfo.id;
//             return res.status(200).json(userInfo);
//         });
//     } catch (error) {
//         return res.status(500).json('there was an error, here are teh details: ' + error);
//     }
// });

// //this route handles the rendering of loggin info
// router.get('/login', async (req, res) => {
//     try {
//         res.render('login')
//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

// // this route handles the login of existing users
// router.post("/login", async (req, res) => {
//     try {
//         const userInfo = await User.findOne({
//             where: {username: req.body.username},
//         });

//         if (!userInfo) {
//             res.status(400).json({
//                 message: "Incorrect user input. Please try again",
//             });
//             return;
//         }
        
//         const validPassword = await userInfo.checkPassword(req.body.password);

//         if (!validPassword) {
//             res.status(400).json({
//                 message: "Incorrect user input. Please try again",
//             });
//             return;
//         }
       
//         req.session.save(() => {
//             req.session.loggedIn = true;
//             req.session.userId = userInfo.id;
//             console.log("-SAVED-", req.session.cookie);

//             res.status(200).json({
//                 user: userInfo,
//                 message: "Successfully logged in.",
//             });
//         });
//     } catch (error) {
//         res.status(500).json('There was an error, here are the details: ' + error);
//     }
// });


// //See user profile/dash while signed in as that user. 
// router.get('/dashboard', authorized, async (req,res) => {
//     if (!req.session.logged_in) {
//       res.redirect('/api/users/login')
//     }
  
//     try {
//       const userData = await User.findByPk(req.session.user_id, {
//         attributes: { exclude: ['password'] },
//         include: [{ model: Post }],
//       });
  
//       const user = userData.get({ plain: true });
  
//       res.render('dashboard', {
//         ...user,
//         logged_in: true
//       });
//     } catch (error) {
//       res.status(500).json(error)
//     }
//   });
  
//   //Creates new post when logged in.
//   router.post('/dashboard', authorized, async (req, res) => {
//     try {
//         const newPost = await Post.create({
//             ...req.body,
//             user_id: req.session.user_id
//         });
  
//         res.status(200).json(newPost);
//     } catch (error) {
//         res.status(500).json(error);
//     }
//   });
  
//   //Deletes post based on ID
//   router.delete('/dashboard/:id', authorized, async (req, res) => {
//     console.log(req.params);
//     try {
//         const postData = await Post.destroy({
//             where: {
//                 id: req.params.id,
//             }
//         });
  
//         if (!postData) {
//             res.status(404).json({ message: 'No post was found!' });
//             return
//         };
  
//         res.status(200).json(postData);
//     } catch (error) {
//         res.status(500).json(error);
//     }
//   })
  
//   //Updates post based on id - not implemeneted yet - need js functionality
//   router.put('/:id', authorized, async (req, res) => {
//     try {
//         const postNewData = await Post.update({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id
//             }
//         });
  
//         res.status(200).json(postNewData);
//     } catch (error) {
//         res.status(500).json(error);
//     }
//   })

// // this route handles the logging out of the user
// router.get("/logout", (req, res) => {
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//             res.status(204).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// });

// module.exports = router;
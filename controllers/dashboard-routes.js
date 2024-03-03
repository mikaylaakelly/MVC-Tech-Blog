const router = require('express').Router();
const { Blog } = require('../models');
const withAuth = require('../utils/auth');

//dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
   
    const userBlogPosts = await BlogPost.findAll({
      where: { user_id: req.session.user_id },
      order: [['date_created', 'DESC']]
    });

 
    res.render('dashboard', { blogPosts: userBlogPosts, logged_in: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user blog posts' });
  }
});

//form to create a new blog post
router.get('/dashboard/new', withAuth, (req, res) => {
  res.render('newPost', { logged_in: true });
});


module.exports = router;
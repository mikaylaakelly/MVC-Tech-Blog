const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

//homepage
router.get('/', async (req, res) => {
  try {
    
    const blogPosts = await Blog.findAll({
      include: { model: User, attributes: ['username'] },
      order: [['date_created', 'DESC']]
    });

    
    res.render('homepage', { 
      blogPosts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// login page
router.get('/login', (req, res) => {
  
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


router.get('/signup', (req, res) => {
  
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const blogPost = await Blog.findByPk(req.params.id, {
      include: { model: User, attributes: ['username'] }
    });

    
    res.render('single-post', {
      blogPost,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
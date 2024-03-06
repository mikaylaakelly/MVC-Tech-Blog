const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text', 'created_at', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text', 'created_at', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('single-post', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/add', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/post/:id', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id, 
        },
      }
    );

    if (!updatedBlog[0]) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, 
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
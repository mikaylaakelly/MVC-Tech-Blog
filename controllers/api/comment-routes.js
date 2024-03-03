const router = require('express').Router();
const { Comment } = require('../models');
const withAuth = require('../utils/auth');


//new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id 
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});


// update
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id 
            }
        });
        if (updatedComment[0] === 0) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!deletedComment) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.status(200).json(deletedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
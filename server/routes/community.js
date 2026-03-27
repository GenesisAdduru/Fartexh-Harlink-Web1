const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, addComment, votePost } = require('../controllers/communityController');

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/:id/comment', addComment);
router.post('/:id/vote', votePost);

module.exports = router;

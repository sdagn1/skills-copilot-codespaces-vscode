// Create web server
// Create a route to get all comments
// Create a route to get a comment by id
// Create a route to create a new comment
// Create a route to delete a comment by id
// Create a route to update a comment by id
// Create a route to get all comments of a post

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get a comment by id
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        return res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            postId: req.body.postId
        });
        const savedComment = await comment.save();
        return res.json(savedComment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Delete a comment by id
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await Comment.remove({ _id: req.params.commentId });
        return res.json(removedComment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Update a comment by id
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne({ _id: req.params.commentId }, { $set: { content: req.body.content } });
        return res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get all comments of a post
router.get('/post/:postId', async (req, res) => {
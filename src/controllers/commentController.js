// src/controllers/commentController.js
const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const newComment = await Comment.create({ content: comment, patientId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCommentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const comments = await Comment.findAll({ where: { patientId } });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addComment, getCommentsByPatientId };

const { Feedback } = require('../models');

// CREATE
exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
    await feedback.update(req.body);
    res.status(200).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
    await feedback.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

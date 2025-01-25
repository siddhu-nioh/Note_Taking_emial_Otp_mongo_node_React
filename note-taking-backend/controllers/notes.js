
const Note = require('../models/note');

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const note = new Note({ userId, title, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
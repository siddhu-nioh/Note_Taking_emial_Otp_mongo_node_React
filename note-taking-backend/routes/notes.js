const express = require('express');
const { createNote, deleteNote, getNotes } = require('../controllers/notes');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.post('/', createNote);
router.delete('/:id', deleteNote);
router.get('/', getNotes);

module.exports = router;
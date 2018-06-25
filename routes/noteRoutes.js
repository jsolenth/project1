
const express = require('express');
const router = express.Router();
const notesController = require('../controller/notesController');

router.get("/getnotes", notesController.getNotes.bind(notesController));
router.post("/note.html", notesController.createNote.bind(notesController));
router.post("/note/:id", notesController.updateNote.bind(notesController));
router.post("/noteAdding/:id", notesController.updateNoteAdding.bind(notesController));
router.get("/note/:id/", notesController.showNote.bind(notesController));

module.exports = router;
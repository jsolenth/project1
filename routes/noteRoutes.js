//import express from 'express';
const express = require('express');
const router = express.Router();
const notesController = require('../controller/notesController');
//import {notesController} from '../controller/notesController';

router.get("/getnotes", notesController.getNotes.bind(notesController));
router.post("/note.html", notesController.createNote.bind(notesController));
router.post("/note/:id", notesController.updateNote.bind(notesController))
router.get("/note/:id/", notesController.showNote.bind(notesController));
//router.post("/note/:id/", notesController.deleteNote.bind(notesController));

//export const noteRoutes = router;
module.exports = router;
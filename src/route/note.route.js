const express = require('express');
const router = express.Router();

// Models
const noteDao = require('../dao/notesDao');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Note
router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Please Write a Title.'});
  }
  if (!description) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      title,
      description
    });
  } else {
    let val = Math.floor((Math.random() * 100000000000) + 1) + "";
    const newNote = {'title': title, 'description':description, '_id': val};
    newNote.user = req.user._id;
    await noteDao.add(newNote);
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
  }
});

// Get All Notes
router.get('/notes', isAuthenticated, async (req, res) => {
  console.log("request user:" +  req.user._id);
  const notes = await noteDao.getAll(req.user._id);
  res.render('notes/all-notes', { notes });
});

// Edit Notes
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const note = await noteDao.getById(req.params.id);
  if(note.user != req.user._id) {
    req.flash('error_msg', 'Not Authorized');
    return res.redirect('/notes');
  } 
  res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await noteDao.update(req.params.id, {'title':title, 'description':description});
  req.flash('success_msg', 'Note Updated Successfully');
  res.redirect('/notes');
});

// Delete Notes
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await noteDao.remove(req.params.id);
  req.flash('success_msg', 'Note Deleted Successfully');
  res.redirect('/notes');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Remark = require('../models/remark')


//like
router.get('/:id/like', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, remark) => {
    if (err) return next(err);
    res.redirect('/events/' + remark.eventId);
  });
});

//dislike
router.get('/:id/dislike', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, {$inc: {likes: -1}}, (err, remark) => {
    if (err) return next(err);
    res.redirect('/events/' + remark.eventId);
  });
});

//open update form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if (err) return next(err);
    res.render('remarkUpdateForm', {remark})
  });
});


//update event
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, req.body, (err, remark) => {
    if (err) return next(err);
    res.redirect('/events/' + remark.eventId);
  });
});

//delete event
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndDelete(id, (err, remark) => {
    if (err) return next(err);
    res.redirect('/events/' + remark.eventId)
  });
});
module.exports = router;

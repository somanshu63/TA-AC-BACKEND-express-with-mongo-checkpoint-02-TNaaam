var express = require('express');
var router = express.Router();
var Event = require('../models/event')
var Remark = require('../models/remark')

/* get events */
router.get('/', function(req, res, next) {
  Event.find({}, (err, events) => {
    if(err) return next(err);
    res.render('events', {events});
  });
});

// get event form
router.get('/new', function(req, res, next) {
  res.render('eventform');
});

//get single event
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  // Event.findById(id, (err, event) => {
  //   if(err) return next(err);
  //   Remark.find({eventId: id}, (err, remarks) => {
  //     if(err) return next(err);
  //     res.render('singleEvent', {event, remarks});
  //   });
  // });
  Event.findById(id).populate('remarks').exec((err, event) => {
    if(err) return next(err);
    res.render('singleEvent', {event})
  });
});



//add event
router.post('/', (req, res, next) => {
  req.body.event_categories = req.body.event_categories.split(' ')
  Event.create(req.body, (err, event) => {
    if (err) return next(err);
    res.redirect('/events');
  });
});


//like
router.get('/:id/like', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  });
});

//dislike
router.get('/:id/dislike', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, {$inc: {likes: -1}}, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  });
});

//open update form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);
    event.event_categories = event.event_categories.join(' ')
    res.render('eventUpdateForm', {event})
  });
});


//update event
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  req.body.event_categories = req.body.event_categories.split(' ')
  Event.findByIdAndUpdate(id, req.body, (err, event) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  });
});

//delete event
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndDelete(id, (err, event) => {
    if (err) return next(err);
    res.redirect('/events')
  });
});

//get based on categories
router.get('/category/:c', (req, res, next) => {
  var category = req.params.c;
  Event.find({event_categories: category}, (err, events) => {
    if (err) return next(err);
    res.render('events', {events})
  });
});

//get based on start date
router.get('/startdate/:e', (req, res, next) => {
  var startDate = req.params.e;
  Event.find({start_date: startDate}, (err, events) => {
    if (err) return next(err);
    res.render('events', {events})
  });
});

//get based on location
router.get('/location/:e', (req, res, next) => {
  var location = req.params.e;
  Event.find({location: location}, (err, events) => {
    if (err) return next(err);
    res.render('events', {events})
  });
});


//save remark
router.post('/:id/remarks', (req, res, next) => {
  var id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body, (err, remark) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(id, {$push: {remarks: remark.id}}, (err, event) => {
      if (err) return next(err);
      res.redirect('/events/' + id);
    });
  });
});


module.exports = router;

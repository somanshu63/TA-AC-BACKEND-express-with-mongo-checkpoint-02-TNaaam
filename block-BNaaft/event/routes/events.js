var express = require('express');
var router = express.Router();
var Event = require('../models/event')
var Remark = require('../models/remark')

/* get events */
router.get('/', function(req, res, next) {
  var query = {};
  var {category, location, start_date, end_date} = req.query;
  if(category){
    query.event_categories = category
  }
  if(location){
    query.location = location
  }
  if(start_date && end_date){
    query.start_date = {$gte: start_date},
    query.end_date = {$lte: end_date}
  }
  console.log(category, location, start_date, end_date)
  Event.distinct('event_categories').exec((err, categories) => {
    if(err) return next(err);
    Event.distinct('location').exec((err, locations) => {
      if(err) return next(err);
        Event.find(query, (err, events) => {
          if(err) return next(err);
          res.render('events', {events, categories, locations});
        });
    });
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

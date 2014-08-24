(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var db = require('diskdb');
  db = db.connect('server/db', ['todos']);

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/todos', function(req, res) {
    res.json(db.todos.find());
  });

  router.post('/api/todos', function(req, res) {
    res.json(db.todos.save(req.body));
  });

  router.put('/api/todos', function(req, res) {
    res.json(db.todos.update({
      _id: req.body._id
    }, {
      isCompleted: req.body.isCompleted,
      todo: req.body.todo
    }));
  });

  router.delete('/api/todos/:_id', function(req, res) {
    res.json(db.todos.remove({
      _id: req.params._id
    }));
  });

  module.exports = router;

}());

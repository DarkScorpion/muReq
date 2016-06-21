'use strict';

var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('ok');
});

//Query routes
app.get('/query', (req, res) => {
  var q = req.query;
  var p1 = q.p1 || '???';
  var p2 = q.p2 || '???';
  var result = p1+' '+p2;
  res.send(result);
});

//Param routes
app.get('/echo/:p1', (req, res) => {
  var p1 = req.params.p1;
  res.send(p1);
});

//Types routes
app.get('/types', (req, res) => {
  res.send('get ok');
});
app.post('/types', (req, res) => {
  res.send('post ok');
});
app.put('/types', (req, res) => {
  res.send('put ok');
});
app.delete('/types', (req, res) => {
  res.send('delete ok');
});

//Route404
app.get('*', (req, res) => {
  res.status(404);
  res.send('404');
});

module.exports = app;

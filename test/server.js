'use strict';

var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('ok');
});

//Query routes
app.get('/query', (req, res) => {
  var q = req.query;
  res.send(q.p1+' '+q.p2);
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

module.exports = app;

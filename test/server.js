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
app.all('/types', (req, res) => {
  res.send(req.method + ' ok');
});

//Route404
app.get('/route404', (req, res) => {
  res.status(404).send('404');
});

//Other routes
app.all('*', (req, res) => {
  console.log('Warning: strange route: %s %s', req.path, req.method);
  res.status(404).send('=?=');
});

module.exports = app;

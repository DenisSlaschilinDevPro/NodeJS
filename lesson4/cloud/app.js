const express = require('express');
const routes = require('./routes');
const log = require('./log');

const app = express();

app.use(routes);

app.use((err, req, res, next) => {
  log.error(err);
  res.status(err.status || err.code || 500);
  res.json(err.message);
});

module.exports = app;

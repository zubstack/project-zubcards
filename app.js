const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  unknownEndpoint,
} = require('./middlewares/error.handler.js');
const requestLogger = require('./middlewares/logger.request');

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use(cors());
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
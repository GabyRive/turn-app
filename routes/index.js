const express = require('express');
const router = express.Router();

module.exports = (app) => {

  app.use('/status', require('./status.js'))
}

'use strict';

var express = require('express');
var controller = require('./twilio.controller');

var router = express.Router();

router.post('/', controller.sendMessage);

module.exports = router;

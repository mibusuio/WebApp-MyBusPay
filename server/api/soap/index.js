'use strict';

var express = require('express');
var controller = require('./soap.controller');

var router = express.Router();

router.post('/', controller.sendRecharge);

module.exports = router;

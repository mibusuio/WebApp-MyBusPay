'use strict';

import config from '../../config/environment';

export function sendMessage(req, res) {
  //var phoneNumber = req.body['number'];
  var phoneNumber = req.body.number;
  //var message = req.body['message'];
  var message = req.body.message;

  // Twilio Credentials
  var accountSid = config.twilio.accountSid;
  var authToken = config.twilio.authToken;

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  //Send an SMS text message
  client.sendMessage({
    to: phoneNumber, // Any number Twilio can deliver to
    from: '+12133753488', // A number you bought from Twilio and can use for outbound communication
    body: message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if(!err) {
      return res.json({responseData});
    } else {
      res.json({err});
    }
  });
}

export function sendNotification(phoneNumber, message) {
  var newPhoneNumber = phoneNumber.substr(1);
  var formattedPhoneNumber = "+593" + newPhoneNumber;

  // Twilio Credentials
  var accountSid = config.twilio.accountSid;
  var authToken = config.twilio.authToken;

  //require the Twilio module and create a REST client
  var client = require('twilio')(accountSid, authToken);

  //Send an SMS text message
  client.sendMessage({
    to: formattedPhoneNumber, // Any number Twilio can deliver to
    from: '+12133753488', // A number you bought from Twilio and can use for outbound communication
    body: message
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if(!err) {
      return responseData;
    } else {
      err;
    }
  });
}

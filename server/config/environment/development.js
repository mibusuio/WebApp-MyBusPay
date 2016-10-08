'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/webapp-dev'
  },

  // Seed database on startup
  seedDB: false,

  twilio: {
    accountSid: 'AC50976e1cca90a53584fc7e5154bcdb3c',
    authToken: '4276981104dbe0ef03707c060debad36'
  }

};

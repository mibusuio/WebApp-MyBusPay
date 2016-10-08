import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './twilio.routes';

export class TwilioController {
  $http;
  calcResult = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.post('/api/twilio', {
      number: '+593998706831',
      message: 'test post'
    }).then(response => {
      console.log(response.data);
    });
  }
}

export default angular.module('hack153App.twilio', [uiRouter])
.config(routing)
.component('twilio', {
  template: require('./twilio.html'),
  controller: TwilioController
})
.name;

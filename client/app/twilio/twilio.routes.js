'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('twilio', {
    url: '/twilio',
    template: '<twilio></twilio>'
  });
}

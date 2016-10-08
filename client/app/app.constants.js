'use strict';

import angular from 'angular';

export default angular.module('hack153App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;

'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import RechargeController from './recharge.controller';

export default angular.module('hack153App.recharge', [uiRouter])
  .controller('RechargeController', RechargeController)
  .name;

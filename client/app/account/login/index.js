'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('hack153App.login', [])
  .controller('LoginController', LoginController)
  .name;

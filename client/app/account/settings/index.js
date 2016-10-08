'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('hack153App.settings', [])
  .controller('SettingsController', SettingsController)
  .name;

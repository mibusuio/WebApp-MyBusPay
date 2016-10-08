'use strict';

import angular from 'angular';
import TransactionsController from './transactions.controller';

export default angular.module('hack153App.transactions', [])
  .controller('TransactionsController', TransactionsController)
  .name;

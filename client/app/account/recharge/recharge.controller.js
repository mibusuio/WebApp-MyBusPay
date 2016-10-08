'use strict';
// @flow

type Recharge = {
  phoneNumber: string;
  amount: string;
};

export default class RechargeController {
  $http;
  recharge: Recharge = {
    phoneNumber: '234',
    amount: ''
  };
  errors = {
    other: undefined
  };
  errorMessage = '';
  successMessage = '';
  submitted = false;
  getCurrentUser: Function;
  Auth;

  /*@ngInject*/
  constructor(Auth, $http) {
    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.recharge.phoneNumber = Auth.getCurrentUserSync().phoneNumber;
    this.$http = $http;
  }

  loadMoney(form) {
    this.submitted = true;

    if(form.$valid) {
      this.$http.post('/api/soap', {
        phoneNumber: this.getCurrentUser().phoneNumber,
        amount: this.recharge.amount,
        identityCard: this.getCurrentUser().identityCard
      }).then(response => {
        var errorCode = response.data.errorCode;
        var resultMessage = response.data.resultMessage;
        if(errorCode != -1){
          this.errorMessage = 'Error: ' + resultMessage;
        } else {
          var amountinCents = parseInt((parseFloat(this.recharge.amount) * 100), 10);
          this.$http.post('/api/things', {
            identityCard: this.getCurrentUser().identityCard,
            phoneNumber: this.getCurrentUser().phoneNumber,
            amount : amountinCents,
            type: 0,
            message: resultMessage
          }).then(response => {
            this.successMessage = resultMessage;
        });
      }
    });
    }
  }
}

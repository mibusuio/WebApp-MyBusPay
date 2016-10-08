'use strict';
// @flow

type Transaction = {
  identityCard: string;
  amount: int;
  phoneNumber: string;
  type: int;
  message: string;
};

export default class TransactionsController {
  transaction: Transaction = {
    identityCard: '',
    amount: 0,
    phoneNumber: '',
    type: 0,
    message: ''
  };
  $http;

  awesomeThings = [{"_id":"57f831cdccf0f6203fe14ffe","identityCard":"1720439866","phoneNumber":"0998706831","amount":200,"type":0,"message":"La operación se completó con éxito. Ref: 217390","__v":0}];
  Auth;

  /*@ngInject*/
  constructor(Auth, $http) {
    this.Auth = Auth;
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        console.log("regresa de things");
        console.log(JSON.stringify(response.data));
        this.awesomeThings = response.data;
        console.log(JSON.stringify(this.awesomeThings));
      });
  }

  getAmount(amount) {
    return (amount / 100);
  }

  getType(type) {
    if (type == 0) return "Abono"
      else return "Pago";
  }


}

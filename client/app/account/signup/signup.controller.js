'use strict';
// @flow

import angular from 'angular';

type User = {
  name: string;
  identityCard: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export default class SignupController {
  user: User = {
    name: '',
    email: '',
    password: '',
    identityCard: '',
    phoneNumber: ''
  };
  errors = {};
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if(form.$valid) {
      console.log("entra form validate")
      return this.Auth.createUser({
        name: this.user.name,
        identityCard: this.user.identityCard,
        email: this.user.email,
        password: this.user.password,
        phoneNumber: this.user.phoneNumber
      })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}

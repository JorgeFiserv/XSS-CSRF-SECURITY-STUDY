angular
  .module("crudApp", ["ngRoute", "ngSanitize", "ui.bootstrap", "oc.lazyLoad"])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix("");
  });

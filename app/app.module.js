angular
  .module("crudApp", ["ngRoute", "ngSanitize", "ui.bootstrap"])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix("");
  });

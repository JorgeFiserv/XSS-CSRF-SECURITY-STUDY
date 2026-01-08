angular.module("crudApp").config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "app/views/login/login.html",
      controller: "LoginController",
      controllerAs: "vm",
      requiresAuth: false,
      resolve: {
        load: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load("app/controllers/login.controller.js");
          },
        ],
      },
    })
    .when("/register", {
      templateUrl: "app/views/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      requiresAuth: false,
      resolve: {
        load: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load("app/controllers/register.controller.js");
          },
        ],
      },
    })
    .when("/home", {
      templateUrl: "app/views/home/home.html",
      controller: "HomeController",
      controllerAs: "vm",
      requiresAuth: true,
      resolve: {
        load: [
          "$ocLazyLoad",
          function ($ocLazyLoad) {
            return $ocLazyLoad.load("app/controllers/home.controller.js");
          },
        ],
      },
    })
    .otherwise({
      redirectTo: "/login",
    });
});

angular.module("crudApp").config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "app/views/login/login.html",
      controller: "LoginController",
      controllerAs: "vm",
      requiresAuth: false,
    })
    .when("/register", {
      templateUrl: "app/views/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      requiresAuth: false,
    })
    .when("/home", {
      templateUrl: "app/views/home/home.html",
      controller: "HomeController",
      controllerAs: "vm",
      requiresAuth: true,
    })
    .otherwise({
      redirectTo: "/login",
    });
});

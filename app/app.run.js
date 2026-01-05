angular
  .module("crudApp")
  .run(function ($rootScope, $location, AuthService, ToastService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      const requiresAuth = next.$$route && next.$$route.requiresAuth;
      const isAuthenticated = AuthService.isAuthenticated();

      if (requiresAuth && !isAuthenticated) {
        event.preventDefault();
        ToastService.error("You must be logged in to access this page!");
        $location.path("/login");
      }

      if (
        !requiresAuth &&
        isAuthenticated &&
        (next.$$route.originalPath === "/login" ||
          next.$$route.originalPath === "/register")
      ) {
        event.preventDefault();
        $location.path("/home");
      }
    });
  });

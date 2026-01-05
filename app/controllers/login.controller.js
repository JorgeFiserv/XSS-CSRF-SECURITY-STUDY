angular
  .module("crudApp")
  .controller(
    "LoginController",
    function (AuthService, $location, ToastService) {
      var vm = this;
      vm.email = "";
      vm.password = "";

      vm.login = function () {
        AuthService.login(vm.email, vm.password)
          .then(() => {
            ToastService.success("Login realizado com sucesso!");
            $location.path("/home");
          })
          .catch((error) => {
            ToastService.error(
              "Erro ao realizar o login. Verifique suas credenciais."
            );
          });
      };
      vm.goToRegister = function () {
        $location.path("/register");
      };
    }
  );

angular
  .module("crudApp")
  .controller(
    "RegisterController",
    function (AuthService, $location, ToastService, $sce, ModalService) {
      var vm = this;
      vm.userInput = "<script>alert('XSS')</script>";
      vm.name = "";
      vm.email = "";
      vm.password = "";
      vm.users = [];
      function generateCSRFToken() {
        AuthService.loadUser().then((users) => {
          vm.users = users.map((u) => ({
            ...u,
            unsafeName: $sce.trustAsHtml(u.name),
          }));
        });
      }
      vm.register = function () {
        const crsfToken = generateCSRFToken();
        AuthService.register(vm.name, vm.email, vm.password, crsfToken)
          .then(() => {
            ToastService.success("Registro realizado com sucesso!");
            document.cookies = "sessionId=abc1234; path=/";
            $location.path("/login");
          })
          .catch((error) => {
            ToastService.error("Erro ao realizar o registro." || error);
          });
      };
      vm.goTologin = function () {
        $location.path("/login");
      };
    }
  );

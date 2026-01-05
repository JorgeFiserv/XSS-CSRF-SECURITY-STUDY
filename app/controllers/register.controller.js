angular
  .module("crudApp")
  .controller(
    "RegisterController",
    function (AuthService, $location, ToastService, $sce, ModalService) {
      var vm = this;
      vm.name = "";
      vm.email = "";
      vm.password = "";
      vm.xssInput = "";
      vm.trustedXssInput = "";
      vm.showXssPreview = false;
      vm.users = [];

      function init() {
        vm.xssInput = "";
      }

      vm.executeXss = function () {
        if (vm.xssInput) {
          vm.trustedXssInput = $sce.trustAsHtml(vm.xssInput);
          vm.showXssPreview = true;
        } else {
          ToastService.error("Please enter some HTML/JS to test XSS");
        }
      };

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
            ToastService.success("Registration successful!");
            document.cookies = "sessionId=abc1234; path=/";
            $location.path("/login");
          })
          .catch((error) => {
            ToastService.error("Registration error." || error);
          });
      };

      vm.goTologin = function () {
        $location.path("/login");
      };

      init();
    }
  );

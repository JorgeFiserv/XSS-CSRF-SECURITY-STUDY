angular
  .module("crudApp")
  .controller("ToastController", function (ToastService) {
    var vm = this;
    vm.toast = ToastService.getToast();
  });

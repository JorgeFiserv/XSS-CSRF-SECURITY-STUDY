angular.module("crudApp").component("confirmModal", {
  templateUrl: "app/components/confirm-modal/confirm-modal.component.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&",
  },
  controller: function () {
    var vm = this;

    vm.$onInit = function () {};

    vm.confirm = function () {
      vm.close({ $value: true });
    };

    vm.cancel = function () {
      vm.dismiss({ $value: "cancel" });
    };
  },
});

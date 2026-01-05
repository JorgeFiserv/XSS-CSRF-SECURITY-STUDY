angular.module("crudApp").component("confirmModal", {
  templateUrl: "app/components/confirm-modal/confirm-modal.component.html",
  bindings: {
    resolve: "<",
    onConfirm: "&",
    onCancel: "&",
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.confirm = function () {
      $ctrl.onConfirm();
    };

    $ctrl.cancel = function () {
      $ctrl.onCancel();
    };
  },
});

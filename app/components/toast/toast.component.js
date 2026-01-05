angular.module("crudApp").component("appToast", {
  template: `
    <div class="toast-container">
      <div
        class="toast toast-{{ $ctrl.type }}"
        ng-class="{'toast-visible': $ctrl.visible, 'toast-hidden': !$ctrl.visible}"
        ng-show="$ctrl.visible"
      >
        <span>{{ $ctrl.message }}</span>
      </div>
    </div>
  `,
  controller: function ($timeout) {
    var ctrl = this;
    var hideTimeout = null;

    ctrl.visible = false;
    ctrl.message = "";
    ctrl.type = "success";

    ctrl.show = function (msg, type) {
      if (hideTimeout) {
        $timeout.cancel(hideTimeout);
      }

      ctrl.message = msg;
      ctrl.type = type;
      ctrl.visible = true;

      hideTimeout = $timeout(function () {
        ctrl.visible = false;
      }, 3000);
    };

    window.__toastComponent = ctrl;
  },
});

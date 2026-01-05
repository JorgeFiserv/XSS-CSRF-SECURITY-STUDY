angular.module("crudApp").component("appLogout", {
  templateUrl: "app/components/logout/logout-component.html",
  bindings: {
    onLogoutRequest: "&",
  },
  controller: function (AuthService, $location, ToastService) {
    var vm = this;

    vm.showConfirmModal = false;
    vm.modalConfig = {};

    vm.openLogoutConfirm = function () {
      vm.modalConfig = {
        title: "Confirm Logout",
        message: "Are you sure you want to logout?",
        confirmText: "Logout",
        cancelText: "Cancel",
        confirmButtonClass: "btn-danger",
      };
      vm.showConfirmModal = true;
    };

    vm.confirmLogout = function () {
      vm.showConfirmModal = false;
      AuthService.logout();
      ToastService.success("Logout successful!");
      $location.path("/login");
    };

    vm.cancelLogout = function () {
      vm.showConfirmModal = false;
    };
  },
});

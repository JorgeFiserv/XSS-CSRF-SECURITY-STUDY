angular.module("crudApp").factory("ModalService", ($uibModal) => {
  function openUserModal(mode, user) {
    return $uibModal.open({
      component: "userModal",
      size: "lg",
      resolve: {
        mode: () => {
          return mode;
        },
        user: () => {
          return user;
        },
      },
    }).result;
  }
  return {
    viewUser: (user) => {
      return openUserModal("view", user);
    },
    editUser: (user) => {
      return openUserModal("edit", user);
    },
    cerateUser: () => {
      return openUserModal("create", null);
    },
    confirm: function (options) {
      return $uibModal.open({
        templateUrl: "components/confirm-modal/confirm-modal.html",
        controller: function ($scope, $uibModalInstance) {
          $scope.title = options.title || "Confirmação";
          $scope.message = options.message || "Tem certeza?";
          $scope.confirmText = options.confirmText || "Confirmar";
          $scope.cancelText = options.cancelText || "Cancelar";

          $scope.confirm = function () {
            $uibModalInstance.close(true);
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss("cancel");
          };
        },
        size: "md",
      });
    },
  };
});

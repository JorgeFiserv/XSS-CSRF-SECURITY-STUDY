angular.module("crudApp").component("userModal", {
  templateUrl: "app/components/user-modal/user-modal.component.html",
  bindings: {
    isOpen: "<",
    mode: "<",
    user: "<",
    title: "<",
    onSave: "&",
    onClose: "&",
  },

  controller: function () {
    var $ctrl = this;
    $ctrl.formData = {};
    $ctrl.saving = false;
    $ctrl.formErrors = null;

    $ctrl.$onInit = function () {
      if ($ctrl.user && Object.keys($ctrl.user).length > 0) {
        $ctrl.formData = angular.copy($ctrl.user);
      } else {
        $ctrl.formData = {
          name: "",
          email: "",
          role: "user",
          status: "active",
        };
      }
    };

    $ctrl.$onChanges = function (changes) {
      if (changes.user) {
        if ($ctrl.user && Object.keys($ctrl.user).length > 0) {
          $ctrl.formData = angular.copy($ctrl.user);
        } else {
          $ctrl.formData = {
            name: "",
            email: "",
            role: "user",
            status: "active",
          };
        }
        $ctrl.formErrors = null;
      }

      if (changes.isOpen && !$ctrl.isOpen) {
        $ctrl.saving = false;
        $ctrl.formErrors = null;
      }
    };

    $ctrl.close = function () {
      $ctrl.onClose();
    };

    $ctrl.save = function (form) {
      $ctrl.formErrors = null;
      if (form) {
        form.$setSubmitted();
      }

      if (!$ctrl.formData.name || !$ctrl.formData.email) {
        $ctrl.formErrors = "Please fill in all required fields.";
        return;
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!$ctrl.formData.email.match(emailRegex)) {
        $ctrl.formErrors = "Please enter a valid email address.";
        return;
      }

      $ctrl.saving = true;
      $ctrl.onSave({ userData: $ctrl.formData });
    };

    $ctrl.getRoleLabel = function (role) {
      var roles = {
        admin: "Administrator",
        user: "User",
        manager: "Manager",
      };
      return roles[role] || "Unknown";
    };
    $ctrl.getStatsusLabel = function (status) {
      var statuses = {
        active: "Ativo",
        inactive: "Inativo",
      };
      return statuses[status] || "Desconhecido";
    };
  },
});

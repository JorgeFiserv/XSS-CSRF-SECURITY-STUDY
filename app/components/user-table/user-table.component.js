angular.module("crudApp").component("appUserTable", {
  templateUrl: "app/components/user-table/user-table.component.html",
  bindings: {
    users: "<",
    loading: "<",
    onViewUser: "&",
    onEditUser: "&",
    onDeleteUser: "&",
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {};
    $ctrl.$onChanges = function (changes) {};
    $ctrl.formatDate = function (dateString) {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("pt-BR");
    };

    $ctrl.getInitials = function (name) {
      if (!name) return "??";
      return name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
        .substring(0, 2);
    };
  },
});

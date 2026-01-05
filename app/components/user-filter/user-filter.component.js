angular.module("crudApp").component("appUserFilter", {
  templateUrl: "app/components/user-filter/user-filter.component.html",
  bindings: {
    searchText: "=",
    onSearch: "&",
    onCreate: "&",
  },
  controller: function () {
    var vm = this;

    vm.handleSearchChange = function () {
      vm.onSearch({ text: vm.searchText });
    };

    vm.handleCreate = function () {
      vm.onCreate();
    };
  },
});

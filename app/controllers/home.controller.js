angular
  .module("crudApp")
  .controller("HomeController", function (UserService, $timeout, ToastService) {
    var vm = this;
    vm.loading = false;
    vm.searchText = "";

    vm.modal = {
      isOpen: false,
      mode: "view",
      user: {},
      title: "",
    };
    vm.showConfirmModal = false;
    vm.modalConfig = {};
    vm.userToDelete = null;

    vm.openConfirmModal = function (user) {
      vm.userToDelete = user;
      vm.modalConfig = {
        title: "Confirm Deletion",
        message: `Are you sure you want to delete user ${user.name}?`,
        confirmText: "Delete",
        cancelText: "Cancel",
        confirmButtonClass: "btn-danger",
      };
      vm.showConfirmModal = true;
    };

    vm.modalConfirm = function () {
      if (vm.userToDelete) {
        UserService.deleteUser(vm.userToDelete.id)
          .then(() => {
            vm.users = vm.users.filter((u) => u.id !== vm.userToDelete.id);
            vm.showConfirmModal = false;
            vm.userToDelete = null;
            $timeout(() => {
              ToastService.success("User deleted successfully!");
            }, 100);
          })
          .catch((error) => {
            ToastService.error("Error deleting user.");
            vm.showConfirmModal = false;
            vm.userToDelete = null;
          });
      }
    };
    vm.modalCancel = function () {
      vm.showConfirmModal = false;
      vm.userToDelete = null;
    };

    vm.loadUsers = function (search) {
      vm.loading = true;
      UserService.getAllUser(search)
        .then((users) => {
          vm.users = users;
          vm.loading = false;
        })
        .catch((error) => {
          vm.loading = false;
          ToastService.error("Error loading users.");
          vm.users = [];
        });
    };

    vm.handleSearch = function (text) {
      vm.searchText = text;
      vm.loadUsers(text);
    };

    vm.createUser = function () {
      vm.modal.isOpen = true;
      vm.modal.mode = "create";
      vm.modal.title = "New User";
      vm.modal.user = {
        name: "",
        email: "",
        role: "",
        status: "active",
      };
    };
    vm.viewUser = function (user) {
      vm.modal.isOpen = true;
      vm.modal.mode = "view";
      vm.modal.title = "User Details";
      vm.modal.user = angular.copy(user);
      console.log("modal state:", vm.modal);
    };
    vm.editUser = function (user) {
      vm.modal.isOpen = true;
      vm.modal.mode = "edit";
      vm.modal.title = "Edit User";
      vm.modal.user = angular.copy(user);
      console.log("modal state:", vm.modal);
    };
    vm.saveUser = function (userData) {
      var savedData = userData || vm.modal.user;
      if (vm.modal.mode === "create") {
        UserService.createUser(savedData)
          .then((newUser) => {
            if (!vm.users) {
              vm.users = [];
            }
            vm.users.push(newUser);

            ToastService.success("User created successfully!");

            vm.closeModal();
          })
          .catch((error) => {
            ToastService.error("Error creating user." + error);
          });
      } else if (vm.modal.mode === "edit") {
        UserService.updateUser(savedData.id, savedData)
          .then((updatedUser) => {
            var index = vm.users.findIndex((u) => u.id === updatedUser.id);
            if (index !== -1) {
              Object.assign(vm.users[index], updatedUser);
            }

            ToastService.success("User updated successfully!");

            vm.closeModal();
          })
          .catch((error) => {
            ToastService.error("Error updating user." + error);
          });
      }
    };
    vm.deleteUser = function (user) {
      vm.openConfirmModal(user);
    };
    vm.closeModal = function () {
      vm.modal.isOpen = false;
      vm.modal.user = {};
    };
    $timeout(() => {
      vm.loadUsers();
    }, 0);
    vm.$onInit = function () {
      vm.loadUsers();
    };
  });

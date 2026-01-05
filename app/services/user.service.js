angular.module("crudApp").factory("UserService", function ($http) {
  var baseUrl = "http://localhost:3000/company-users";

  return {
    getAllUser: function (searchText = "") {
      let url = baseUrl;
      if (searchText && searchText.trim() !== "") {
        const searchTerm = searchText.trim().toLowerCase();
        url = `${baseUrl}?name_like=${encodeURIComponent(
          searchTerm
        )}&_email_like=${encodeURIComponent(searchTerm)}`;
      }

      return $http
        .get(url)
        .then((response) => {
          if (searchText && searchText.trim() !== "") {
            const term = searchText.trim().toLowerCase();
            const filteredUsers = response.data.filter((user) => {
              return (
                (user.name && user.name.toLowerCase().includes(term)) ||
                (user.email && user.email.toLowerCase().includes(term))
              );
            });
            return filteredUsers;
          }
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
    },

    createUser: function (userData) {
      return $http
        .post(baseUrl, userData)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    },

    updateUser: function (id, userData) {
      return $http
        .put(`${baseUrl}/${id}`, userData)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    },

    deleteUser: function (id) {
      return $http
        .delete(`${baseUrl}/${id}`)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    },
  };
});

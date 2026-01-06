angular.module("crudApp").factory("UserService", function ($http) {
  var baseUrl = "http://localhost:3000/company-users";

  function generateCSRFToken() {
    const token =
      "csrf_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now();
    sessionStorage.setItem("csrfToken", token);
    return token;
  }

  function getCSRFToken() {
    let token = sessionStorage.getItem("csrfToken");
    if (!token) {
      token = generateCSRFToken();
    }
    return token;
  }

  function getHeadersWithCSRF() {
    return {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCSRFToken(),
    };
  }

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
        .post(baseUrl, userData, { headers: getHeadersWithCSRF() })
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    },

    updateUser: function (id, userData) {
      return $http
        .put(`${baseUrl}/${id}`, userData, { headers: getHeadersWithCSRF() })
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    },

    deleteUser: function (id) {
      return $http
        .delete(`${baseUrl}/${id}`, { headers: getHeadersWithCSRF() })
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    },

    getCSRFToken: getCSRFToken,
    generateCSRFToken: generateCSRFToken,
  };
});

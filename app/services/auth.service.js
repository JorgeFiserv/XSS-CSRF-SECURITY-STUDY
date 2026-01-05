angular.module("crudApp").factory("AuthService", function ($http, $q) {
  const API = "http://localhost:3000/users";
  let currentUser = null;

  return {
    isAuthenticated: function () {
      const user = this.getUser();
      return user !== null && user !== undefined;
    },
    checkAuth: function () {
      if (this.isAuthenticated()) {
        return $q.resolve(this.getUser());
      } else {
        return $q.reject("User not authenticated");
      }
    },

    loadUser() {
      return $http.get(API).then(function (response) {
        return response.data;
      });
    },

    register(name, email, password, crsfToken) {
      if (!name || !email || !password) {
        return $q.reject("All fields are required");
      }

      return $http
        .post(
          API,
          { name, email, password },
          {
            headers: {
              "X-CSRF-Token": crsfToken,
            },
          }
        )
        .then(function (res) {
          currentUser = res.data;
          localStorage.setItem("user", JSON.stringify(currentUser));
          return currentUser;
        })
        .catch(() => {
          return $q.reject("Error registering user");
        });
    },

    login(email, password) {
      return $http
        .get(`${API}?email=${email}&password=${password}`)
        .then((res) => {
          if (res.data.length === 1) {
            currentUser = res.data[0];
            localStorage.setItem("user", JSON.stringify(currentUser));
            return currentUser;
          }
          return $q.reject("Invalid email or password");
        });
    },

    getUser() {
      if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem("user"));
      }
    },

    logout() {
      currentUser = null;
      localStorage.removeItem("user");
    },
  };
});

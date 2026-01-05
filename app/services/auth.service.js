angular.module("crudApp").factory("AuthService", function ($http, $q) {
  const API = "http://localhost:3000/users";
  let currentUser = null;

  function generateFakeToken(user) {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const tokenData = {
      userId: user.id,
      email: user.email,
      timestamp: timestamp,
      token: `jwt_${randomStr}_${timestamp}`,
    };
    return JSON.stringify(tokenData);
  }

  function getTokenFromStorage() {
    return localStorage.getItem("authToken");
  }

  function setTokenInStorage(token) {
    localStorage.setItem("authToken", token);
  }

  function removeTokenFromStorage() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  function isTokenValid() {
    const token = getTokenFromStorage();
    if (!token) return false;

    try {
      const tokenData = JSON.parse(token);
      const now = Date.now();
      const tokenAge = now - tokenData.timestamp;
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      return tokenAge < sevenDaysInMs;
    } catch (e) {
      return false;
    }
  }

  return {
    isAuthenticated: function () {
      if (!isTokenValid()) {
        removeTokenFromStorage();
        currentUser = null;
        return false;
      }
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
          const token = generateFakeToken(currentUser);
          setTokenInStorage(token);
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
            const token = generateFakeToken(currentUser);
            setTokenInStorage(token);
            localStorage.setItem("user", JSON.stringify(currentUser));
            return currentUser;
          }
          return $q.reject("Invalid email or password");
        });
    },

    getUser() {
      if (!currentUser && isTokenValid()) {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            currentUser = JSON.parse(userStr);
          } catch (e) {
            currentUser = null;
          }
        }
      }
      return currentUser;
    },

    getToken() {
      return getTokenFromStorage();
    },

    logout() {
      currentUser = null;
      removeTokenFromStorage();
    },
  };
});

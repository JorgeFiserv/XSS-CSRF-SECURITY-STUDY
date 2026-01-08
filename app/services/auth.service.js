angular.module("crudApp").factory("AuthService", function ($http, $q) {
  const API = "http://localhost:3000/users";
  let currentUser = null;

  function setCookie(name, value, days = 7) {
    const expire = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expire}; path=/`;
  }

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
  }

  function setTokenInStorage(token) {
    setCookie("authToken", token);
  }

  function removeTokenFromStorage() {
    removeCookie("authToken");
    removeCookie("user");
  }

  function getTokenFromStorage() {
    return getCookie("authToken");
  }

  function isTokenValid() {
    const token = getTokenFromStorage();
    if (!token) return false;

    try {
      const tokenData = JSON.parse(decodeURIComponent(token));
      const now = Date.now();
      const tokenAge = now - tokenData.timestamp;
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      return tokenAge < sevenDaysInMs;
    } catch (e) {
      console.error("Erro ao validar token:", e);
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
          const token = JSON.stringify({
            userId: currentUser.id,
            email: currentUser.email,
            timestamp: Date.now(),
            token: `jwt_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`,
          });
          setTokenInStorage(token);
          setCookie("user", JSON.stringify(currentUser));
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
            const token = JSON.stringify({
              userId: currentUser.id,
              email: currentUser.email,
              timestamp: Date.now(),
              token: `jwt_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`,
            });
            setTokenInStorage(token);
            setCookie("user", JSON.stringify(currentUser));
            return currentUser;
          }
          return $q.reject("Invalid email or password");
        });
    },

    getUser() {
      if (!currentUser && isTokenValid()) {
        const userStr = getCookie("user");
        if (userStr) {
          try {
            currentUser = JSON.parse(decodeURIComponent(userStr));
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

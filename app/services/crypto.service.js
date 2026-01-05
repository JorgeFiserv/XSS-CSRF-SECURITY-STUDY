angular.module("crudApp").factory("CryptoService", function ($http, $q) {
  if (typeof CryptoJS === "undefined") {
    throw new Error("CryptoJS library is not loaded");
  }
  const APP_SALT = "CRUD-ANGULARJS-SALT";

  function hashPassword(password) {
    return CryptoJS.SHA256(password + APP_SALT).toString();
  }
  return {
    hashPassword: hashPassword,
  };
});

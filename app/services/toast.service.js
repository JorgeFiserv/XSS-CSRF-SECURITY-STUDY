angular.module("crudApp").factory("ToastService", function ($timeout) {
  var toastElement = null;
  var hideTimeout = null;

  function createToastElement() {
    if (toastElement) return toastElement;

    var container = document.createElement("div");
    container.className = "toast-container-fixed";

    var toast = document.createElement("div");
    toast.className = "toast";

    container.appendChild(toast);
    document.body.appendChild(container);

    toastElement = { container: container, toast: toast };
    return toastElement;
  }

  function show(message, type) {
    var element = createToastElement();
    var toast = element.toast;

    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    toast.className = "toast toast-" + type;
    toast.textContent = message;

    setTimeout(function () {
      toast.classList.add("toast-show");
    }, 10);

    hideTimeout = setTimeout(function () {
      toast.classList.remove("toast-show");

      setTimeout(function () {
        toast.className = "toast";
      }, 300);
    }, 8000);
  }

  return {
    success: function (msg) {
      show(msg, "success");
    },
    error: function (msg) {
      show(msg, "error");
    },
    getToast: function () {
      return { visible: false, message: "", type: "info" };
    },
  };
});

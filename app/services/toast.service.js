angular.module("crudApp").factory("ToastService", function ($timeout) {
  var toastElement = null;
  var hideTimeout = null;

  function createToastElement() {
    if (toastElement) return toastElement;

    var container = document.createElement("div");
    container.className = "toast-container-fixed";
    container.style.cssText =
      "position: fixed; top: 20px; right: 20px; z-index: 9999;";

    var toast = document.createElement("div");
    toast.className = "toast";
    toast.style.cssText =
      "padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); color: white; font-weight: 500; min-width: 300px; transform: translateX(400px); opacity: 0; transition: all 0.3s ease-out; font-family: 'Roboto', sans-serif; display: none;";

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

    var backgroundColor = "#4caf50";
    if (type === "error") backgroundColor = "#f44336";
    if (type === "warning") backgroundColor = "#ff9800";
    if (type === "info") backgroundColor = "#2196f3";

    toast.textContent = message;
    toast.style.backgroundColor = backgroundColor;
    toast.style.display = "block";

    setTimeout(function () {
      toast.style.transform = "translateX(0)";
      toast.style.opacity = "1";
    }, 10);

    hideTimeout = setTimeout(function () {
      toast.style.transform = "translateX(400px)";
      toast.style.opacity = "0";

      setTimeout(function () {
        toast.style.display = "none";
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

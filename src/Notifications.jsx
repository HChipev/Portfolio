import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successNotification = (message, options = {}) => {
  toast.success(message, {
    position: options.position || "top-center",
    autoClose: options.autoClose || 3000,
    hideProgressBar: options.hideProgressBar || false,
    closeOnClick: options.closeOnClick || true,
    pauseOnHover: options.pauseOnHover || true,
    draggable: options.draggable || true,
    progress: options.progress || undefined,
    theme: options.theme || "light",
  });
};

export const errorNotifications = (message, options = {}) => {
  toast.error(message, {
    position: options.position || "top-center",
    autoClose: options.autoClose || 3000,
    hideProgressBar: options.hideProgressBar || false,
    closeOnClick: options.closeOnClick || true,
    pauseOnHover: options.pauseOnHover || true,
    draggable: options.draggable || true,
    progress: options.progress || undefined,
    theme: options.theme || "light",
  });
};

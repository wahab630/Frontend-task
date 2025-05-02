// src/utils/toastNotifications.js (or similar)

import { toast, type ToastPosition } from "react-toastify";

const defaultToastOptions = {
    autoClose: 2000,
    position: 'top-right' as ToastPosition,
    pauseOnHover: true,
    draggable: true,
    closeOnClick: true,
};

export const notifySuccess = (message = "Success") =>
    toast.success(message, defaultToastOptions);

export const notifyError = (message = "Something went wrong") =>
    toast.error(message, defaultToastOptions);

export const notifyInfo = (message = "FYI") =>
    toast.info(message, defaultToastOptions);

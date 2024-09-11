import { StateCreator } from "zustand";

type Notification = {
  message: string;
  show: boolean;
  error: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  closeNotification: () => void;
  showNotification: (noti: Notification) => void;
};

export const createNotificationSlice: StateCreator<NotificationSliceType> = (
  set
) => ({
  notification: {
    message: "",
    show: false,
    error: false,
  },

  showNotification: (noti) => {
    set({
      notification: {
        message: noti.message,
        show: noti.show,
        error: noti.error,
      },
    });
    setTimeout(() => {
      set({ notification: { message: "", show: false, error: false } });
    }, 1500);
  },

  closeNotification: () => {
    set({ notification: { message: "", show: false, error: false } });
  },
});

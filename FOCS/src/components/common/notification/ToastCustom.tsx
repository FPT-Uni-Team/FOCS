/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NotificationPlacement } from "antd/es/notification/interface";

type NotificationType = "success" | "info" | "warning" | "error";

let notificationApi: any = null;
export const setNotificationApi = (apiInstance: any) => {
  notificationApi = apiInstance;
};

export const showNotification = (
  type: NotificationType,
  message: string,
  description?: string,
  duration: number = 4.5,
  placement: NotificationPlacement = "top"
) => {
  notificationApi[type]({
    message,
    description,
    duration,
    placement,
  });
};

export enum NOTIFICATION_TYPE {
  success = 'success',
  error = 'error',
}

export interface INotification {
  type: NOTIFICATION_TYPE;
  heading?: string;
  text?: string;
}

export interface INotificationElement extends INotification {
  id: number;
  delayClose?: number;
}

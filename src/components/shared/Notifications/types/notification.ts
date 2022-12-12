export type notificationType = 'success' | 'error';

export interface INotification {
  type: notificationType;
  heading?: string;
  text?: string;
}

export interface INotificationElement extends INotification {
  id: number;
  delayClose?: number;
}

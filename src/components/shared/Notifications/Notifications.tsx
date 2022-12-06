import { FC } from 'react';
import { createPortal } from 'react-dom';

import Notification from './Notification';

import { INotificationElement } from './types/notification';

import styles from './Notifications.module.css';

interface INotificationsProps {
  notifications: INotificationElement[],
  /**Функция, которая фильтрует массив уведомлений от уведомления с заданным id */
  closeNotification: (id: number) => void,
  delayClose?: number,
}

export const Notifications: FC<INotificationsProps> = ({
  notifications,
  closeNotification,
  delayClose = 5000,
}) => {
  return createPortal(
    <div className={styles.notifications}>
      {notifications.map((item) => (
        <Notification
          {...item}
          key={item.id}
          onClose={closeNotification}
          delayClose={(item.delayClose && item.delayClose >= 0)  ? item.delayClose : delayClose}
        />
      ))}
    </div>,
    document.body
  );
};

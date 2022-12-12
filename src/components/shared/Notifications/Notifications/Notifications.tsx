import { FC } from 'react';
import { createPortal } from 'react-dom';

import Notification from '../Notification/Notification';

import { INotificationElement } from '../types/notification';

import styles from './Notifications.module.css';

interface NotificationsProps {
  notifications: INotificationElement[];
  closeNotification: (id: number) => void;
  delayClose?: number;
}

export const Notifications: FC<NotificationsProps> = ({
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
          delayClose={
            (item.delayClose || item.delayClose === 0) && item.delayClose >= 0
              ? item.delayClose
              : delayClose
          }
        />
      ))}
    </div>,
    document.body
  );
};

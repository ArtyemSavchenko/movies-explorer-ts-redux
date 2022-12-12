import { FC, useEffect, useState } from 'react';

import { INotificationElement } from '../types/notification';
import { setClassName } from '../utils/setClassName';

import styles from './Notification.module.css';

export interface NotificationProps extends INotificationElement {
  onClose: (id: number) => void;
}

const Notification: FC<NotificationProps> = ({
  id,
  type,
  heading,
  text,
  onClose,
  delayClose,
}) => {
  const [state, setState] = useState<string>('');

  const closeNotification = () => {
    setState('close');
    setTimeout(() => {
      onClose(id);
    }, 1500);
  };

  useEffect(() => {
    if (delayClose && delayClose > 0) {
      setTimeout(() => {
        closeNotification();
      }, delayClose);
    }
  }, []);

  return (
    <div
      className={setClassName(
        styles.notification,
        type === 'success' && styles.notification_type_success,
        type === 'error' && styles.notification_type_error,
        state === 'open' && styles.notification_state_open,
        state === 'close' && styles.notification_state_close
      )}
    >
      <div>
        <p className={styles.notification__heading}>{heading}</p>
        <p className={styles.notification__text}>{text}</p>
      </div>
      <button
        type="button"
        className={styles.notification__btnClose}
        onClick={closeNotification}
        aria-label="Закрыть уведомление."
      />
    </div>
  );
};

export default Notification;

import { FC, useCallback, useEffect, useState } from 'react';

import { INotificationElement, NOTIFICATION_TYPE } from './types/notification';

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

  const closeNotification = useCallback(() => {
    setState('close');
    setTimeout(() => {
      onClose(id);
    }, 1500);
  }, [id, onClose]);

  useEffect(() => {
    if (delayClose && delayClose > 0) {

      setTimeout(() => {
        closeNotification();
      }, delayClose);
    }
  }, [delayClose, closeNotification]);

  return (
    <div
      className={`${styles.notification} ${
        type === NOTIFICATION_TYPE.success
          ? styles.notification_type_success
          : ''
      }${
        type === NOTIFICATION_TYPE.error ? styles.notification_type_error : ''
      } ${state === 'open' ? styles.notification_state_open : ''}${
        state === 'close' ? styles.notification_state_close : ''
      }
      `}
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

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Notifications } from './Notifications';
import { INotification, INotificationElement } from './types/notification';
import { generateId } from './utils/generateId';

type INotificationsContext = (
  notification: INotification,
  delayClose?: number
) => number;

const NotificationsContext = createContext<INotificationsContext>(() => 0);

interface INotificationsProvider {
  delayClose?: number;
  children: ReactNode;
}

const NotificationsProvider: FC<INotificationsProvider> = ({
  delayClose,
  children,
}) => {
  const [notifications, setNotifications] = useState<INotificationElement[]>(
    []
  );

  const pushNotification = useCallback<INotificationsContext>(
    (notification, delayClose) => {
      const newId = generateId();
      const newNotification: INotificationElement = {
        ...notification,
        id: newId,
      };

      if (delayClose && delayClose >= 0) {
        newNotification.delayClose = delayClose;
      }

      setNotifications((notifications) => [newNotification, ...notifications]);

      return newId;
    },
    []
  );

  const closeNotification = useCallback((id: number): void => {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.id !== id)
    );
  }, []);

  return (
    <NotificationsContext.Provider value={pushNotification}>
      <Notifications
        notifications={notifications}
        closeNotification={closeNotification}
        delayClose={delayClose}
      />
      {children}
    </NotificationsContext.Provider>
  );
};

export const usePushNotification = () => useContext(NotificationsContext);

export default NotificationsProvider;

import { FC } from 'react';

import './App.css';
import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';
import { NOTIFICATION_TYPE } from './components/shared/Notifications/types/notification';

const App: FC = () => {
  const pushNotification = usePushNotification();

  const addNotification = () => {
    pushNotification({
      type: NOTIFICATION_TYPE.success,
      heading: 'hello',
    })
  }

  return (
    <div>
      <button onClick={addNotification}>Addddddddddddddddddddd</button>
    </div>
  );
};

export default App;

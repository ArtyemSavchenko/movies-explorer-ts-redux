import { FC } from 'react';

import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';
import { NOTIFICATION_TYPE } from './components/shared/Notifications/types/notification';
import BtnClose from './components/ui/BtnClose/BtnClose';
import './App.css';
import {
  CustomLink,
  CustomLinkProps,
} from './components/ui/CustomLink/CustomLink';

const App: FC = () => {
  const pushNotification = usePushNotification();

  const addNotification = () => {
    pushNotification({
      type: NOTIFICATION_TYPE.success,
      heading: 'hello',
    });
  };
  return (
    <div>
      <BtnClose />
      <CustomLink
        appearance="accent"
        feature="external-link"
        aria-label="asd"
        to=""
        href="https://ya.ru/"
        onClick={addNotification}
        extraClass='asdwqe'
      >
        BUTTON
      </CustomLink>
      <CustomLink
        appearance={'default'}
        feature="button"
        aria-label="asd"
        to=""
        href="https://ya.ru/"
        onClick={addNotification}
      >
        BUTTON
      </CustomLink>
    </div>
  );
};

export default App;

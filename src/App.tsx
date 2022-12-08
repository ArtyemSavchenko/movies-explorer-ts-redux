import { FC, useState } from 'react';

import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';
import { NOTIFICATION_TYPE } from './components/shared/Notifications/types/notification';
import './App.css';

import FormInput from './components/ui/FormInput/FormInput';
import LikeBtn from './components/ui/LikeBtn/LikeBtn';
import Logo from './components/ui/Logo/Logo';
import LogoLink from './components/ui/LogoLink/LogoLink';

const App: FC = () => {
  const pushNotification = usePushNotification();

  const addNotification = () => {
    pushNotification({
      type: NOTIFICATION_TYPE.success,
      heading: 'hello',
    }, 1000);
  };

  const [isLiked, setIsLiked] = useState(false)
  return (
    <div>
      <FormInput placeholder='Placeholder' />
      <LikeBtn onClick={() => setIsLiked((isLiked) => !isLiked)} type='button' isLiked={isLiked}>Save</LikeBtn>
      <Logo funny/>
      <LogoLink/>
    </div>
  );
};

export default App;

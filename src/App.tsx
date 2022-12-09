import { FC, useState } from 'react';

import { usePushNotification } from './components/shared/Notifications/NotificationsProvider';
import { NOTIFICATION_TYPE } from './components/shared/Notifications/types/notification';
import './App.css';

import FormInput from './components/ui/FormInput/FormInput';
import LikeBtn from './components/ui/LikeBtn/LikeBtn';
import Logo from './components/ui/Logo/Logo';
import LogoLink from './components/ui/LogoLink/LogoLink';
import ModernCheckbox from './components/ui/ModernCheckbox/ModernCheckbox';
import Preloader from './components/ui/Preloader/Preloader';
import ProfileInput from './components/ui/ProfileInput/ProfileInput';
import { CustomLink } from './components/ui/CustomLink/CustomLink';

const App: FC = () => {
  const pushNotification = usePushNotification();
  const [isChecked, setIsChecked] = useState(false);

  const addNotification = () => {
    pushNotification(
      {
        type: NOTIFICATION_TYPE.success,
        heading: 'hello',
      },
      1000
    );
  };

  return (
    <div>
      <ModernCheckbox
        checked={isChecked}
        onChange={() => setIsChecked((isChecked) => !isChecked)}
        label="label"
      />
      <Preloader />
      <ProfileInput label='First name' error='wqewqewqe'/>
      <ProfileInput label='Last name'/>
      <ProfileInput label='E-mail'/>
      <CustomLink feature='button' >wqewqe</CustomLink>
    </div>
  );
};

export default App;

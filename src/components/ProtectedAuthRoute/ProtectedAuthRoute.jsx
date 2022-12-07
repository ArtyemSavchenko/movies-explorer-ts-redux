import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { CurrentUser } from '../../contexts/CurrentUserContext';

const ProtectedAuthRoute = ({ Component }) => {
  const { user } = useContext(CurrentUser);

  return user ? <Component /> : <Navigate to="/signin" />;
};

export default ProtectedAuthRoute;

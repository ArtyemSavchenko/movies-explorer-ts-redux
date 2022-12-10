import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { ProtectedAuthRouteProps } from '../../types/ProtectedAuthRouteProps';
import { CurrentUser } from '../../contexts/CurrentUserContext';

const ProtectedAuthRoute: FC<ProtectedAuthRouteProps> = ({ Component }) => {
  const { user } = useContext(CurrentUser);

  return user ? <Component /> : <Navigate to="/signin" />;
};

export default ProtectedAuthRoute;

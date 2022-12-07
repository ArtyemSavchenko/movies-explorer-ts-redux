import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { CurrentUser } from '../../contexts/CurrentUserContext';

const ProtectedNotAuthRoute = ({ Component }) => {
  const { user } = useContext(CurrentUser);

  return !user ? <Component /> : <Navigate to="/movies" />;
};

export default ProtectedNotAuthRoute;

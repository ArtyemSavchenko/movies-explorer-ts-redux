import { ComponentType, FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

const ProtectedAuthRoute: FC<{ Component: ComponentType }> = ({
  Component,
}) => {
  const { user } = useAppSelector(({ main }) => main);

  return user === null ? <Navigate to="/signin" /> : <Component />;
};

export default ProtectedAuthRoute;

import { ComponentType, FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

const ProtectedNotAuthRoute: FC<{ Component: ComponentType }> = ({
  Component,
}) => {
  const { user } = useAppSelector(({ main }) => main);

  return user?._id ? <Navigate to="/movies" /> : <Component />;
};

export default ProtectedNotAuthRoute;

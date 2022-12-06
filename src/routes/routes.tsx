import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from '../App';
// import ProtectedAuthRoute from '../components/ProtectedAuthRoute/ProtectedAuthRoute';
// import ProtectedNotAuthRoute from '../components/ProtectedNotAuthRoute/ProtectedNotAuthRoute';

// const Landing = lazy(() => import('../components/pages/Landing/Landing'));
// const NotFound = lazy(() => import('../components/pages/NotFound/NotFound'));
// const Register = lazy(() => import('../components/pages/Register/Register'));
// const Profile = lazy(() => import('../components/pages/Profile/Profile'));
// const Login = lazy(() => import('../components/pages/Login/Login'));
// const Movies = lazy(() => import('../components/pages/Movies/Movies'));
// const SavedMovies = lazy(() =>
//   import('../components/pages/SavedMovies/SavedMovies')
// );

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

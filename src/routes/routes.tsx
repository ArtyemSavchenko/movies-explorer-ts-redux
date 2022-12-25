import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import ProtectedAuthRoute from '../components/ProtectedAuthRoute/ProtectedAuthRoute';
import ProtectedNotAuthRoute from '../components/ProtectedNotAuthRoute/ProtectedNotAuthRoute';

const Promo = lazy(() => import('../components/pages/Promo/Promo'));
const NotFound = lazy(() => import('../components/pages/NotFound/NotFound'));
const Register = lazy(() => import('../components/pages/Register/Register'));
const Profile = lazy(() => import('../components/pages/Profile/Profile'));
const Login = lazy(() => import('../components/pages/Login/Login'));
const Movies = lazy(() => import('../components/pages/Movies/Movies'));
const SavedMovies = lazy(
  () => import('../components/pages/SavedMovies/SavedMovies')
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Promo />,
      },
      {
        path: 'movies',
        element: <ProtectedAuthRoute Component={Movies} />,
      },
      {
        path: 'saved-movies',
        element: <ProtectedAuthRoute Component={SavedMovies} />,
      },
      {
        path: 'profile',
        element: <ProtectedAuthRoute Component={Profile} />,
      },
      {
        path: 'signup',
        element: <ProtectedNotAuthRoute Component={Register} />,
      },
      {
        path: 'signin',
        element: <ProtectedNotAuthRoute Component={Login} />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

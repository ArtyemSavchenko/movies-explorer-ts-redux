import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/routes';
import NotificationsProvider from './components/shared/Notifications/NotificationsProvider';

import './index.css';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <NotificationsProvider delayClose={3000}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NotificationsProvider>
  </StrictMode>
);

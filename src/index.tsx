import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { router } from './routes/routes';
import NotificationsProvider from './components/shared/Notifications/NotificationsProvider';
import store from './store';

import './index.css';

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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/routes';
import NotificationsProvider from './components/shared/Notifications/NotificationsProvider';

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <NotificationsProvider delayClose={3000}>
      <RouterProvider router={router} />
    </NotificationsProvider>
  </StrictMode>
);

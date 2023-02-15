import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import ErrorPage from './error-page';
import Contact from './routes/Contact/Contact';
import Root from './routes/Root';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onEventSignIn } from './lib/events/events';
import { LoginForm } from './routes/Login/LoginForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/contacts/:contactId',
        element: <Contact />,
      },
      {
        path: '/login',
        element: <LoginForm />,
        action: onEventSignIn,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

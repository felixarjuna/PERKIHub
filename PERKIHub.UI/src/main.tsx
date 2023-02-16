import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import ErrorPage from './error-page';
import User from './routes/User/User';
import Root from './routes/Root';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  onCreateUser,
  onEventSignIn,
  onLoadUser,
  onLoadUsers,
  onUpdateUser,
} from './lib/events/events';
import EditUser from './routes/User/Edit';
import { LoginForm } from './routes/Login/LoginForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: onLoadUsers,
    action: onCreateUser,
    children: [
      {
        path: '/users/:userID',
        element: <User />,
        loader: ({ params }) => onLoadUser(params),
      },
      {
        path: '/users/:userID/edit',
        element: <EditUser />,
        loader: ({ params }) => onLoadUser(params),
        action: ({ request, params }) => onUpdateUser({ request, params }),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />,
    action: onEventSignIn,
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

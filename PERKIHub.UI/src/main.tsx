import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import ErrorPage from './error-page';
import User from './routes/User/User';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import {
  onCreateUser,
  onDeleteUser,
  onEventSignIn,
  onLoadUser,
  onLoadUsers,
  onUpdateUser,
} from './lib/events/events';
import { Homepage } from './routes/Homepage/Homepage';
import { Index } from './routes/Index/Index';
import { LoginForm } from './routes/Login/LoginForm';
import EditUser from './routes/User/Edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <LoginForm />,
    action: onEventSignIn,
  },
  {
    path: '/app',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: onLoadUsers,
    action: onCreateUser,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: '/app/users/:userID',
            element: <User />,
            loader: ({ params }) => onLoadUser(params),
          },
          {
            path: '/app/users/:userID/edit',
            element: <EditUser />,
            loader: ({ params }) => onLoadUser(params),
            action: ({ request, params }) => onUpdateUser({ request, params }),
          },
          {
            path: '/app/users/:userID/delete',
            action: ({ params }) => onDeleteUser(params),
          },
        ],
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

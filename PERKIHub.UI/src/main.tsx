import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './error-page';
import { onEventRegister, onEventSignIn } from './lib/events/events';
import { AuthProvider } from './lib/hooks/useAuth';
import { CreateEventForm } from './routes/App/Events/CreateEventForm';
import { Events } from './routes/App/Events/Events';
import { LoginForm } from './routes/Authentication/LoginForm';
import { RegisterForm } from './routes/Authentication/RegisterForm';
import { Homepage } from './routes/Homepage/Homepage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/login',
    element: <LoginForm />,
    action: onEventSignIn(queryClient),
    errorElement: <>Hello</>,
  },
  {
    path: '/register',
    element: <RegisterForm />,
    action: onEventRegister,
  },
  {
    path: 'app',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'events',
        element: <Events />,
        errorElement: <ErrorPage />,
        children: [
          // {
          //   path: '/app/users/:userID',
          //   loader: ({ params }) => onLoadUser(params),
          // },
          // {
          //   path: '/app/users/:userID/edit',
          //   element: <EditUser />,
          //   loader: ({ params }) => onLoadUser(params),
          //   action: ({ request, params }) => onUpdateUser({ request, params }),
          // },
          // {
          //   path: '/app/users/:userID/delete',
          //   action: ({ params }) => onDeleteUser(params),
          // },
        ],
      },
      {
        path: 'events/create',
        element: <CreateEventForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

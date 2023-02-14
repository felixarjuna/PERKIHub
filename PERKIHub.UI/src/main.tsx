import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './index.css';
import { signIn } from './lib/api/api';
import { SignInRequest } from './lib/api/contracts';
import Root from './routes/Root';

const onEventSignIn = async () => {
  const signInRequest: SignInRequest = {
    email: 'felixarjuna@ymail.com',
    password: 'hello123',
  };

  await signIn(signInRequest);
  return redirect('/');
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    action: onEventSignIn,
  },
  {
    path: '/webapp',
    element: <Root />,
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

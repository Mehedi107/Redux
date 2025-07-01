import App from '@/App';
import Home from '@/pages/home';
import User from '@/pages/user';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', Component: Home },
      { path: 'user', Component: User },
    ],
  },
]);

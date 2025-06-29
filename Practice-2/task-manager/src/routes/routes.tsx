import App from '@/App';
import Home from '@/pages/home';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', Component: Home },
      { path: 'about', element: <div>About page</div> },
      { path: 'contact', element: <div>Contact page</div> },
    ],
  },
]);

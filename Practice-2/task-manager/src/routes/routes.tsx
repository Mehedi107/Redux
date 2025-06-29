import App from '@/App';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', element: <div>Home page</div> },
      { path: 'about', element: <div>About page</div> },
      { path: 'contact', element: <div>Contact page</div> },
    ],
  },
]);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.tsx';
import BookSummeryPage from './pages/BookSummery.tsx';
import Home from './pages/Home.tsx';
import CreateBook from './pages/CreateBook.tsx';
import { Toaster } from 'react-hot-toast';
import EditBook from './pages/EditBook.tsx';
import BorrowBook from './pages/BorrowBook.tsx';
import BorrowSummary from './components/BorrowSummery.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: BookSummeryPage },
      { path: 'create-book', Component: CreateBook },
      { path: 'edit-book/:id', Component: EditBook },
      { path: 'borrow/:bookId', Component: BorrowBook },
      { path: 'borrow-summary', Component: BorrowSummary },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

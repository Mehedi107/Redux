import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

import { Outlet } from 'react-router';
import './App.css';
import { Button } from './components/ui/button';

function App() {
  return (
    <>
      <div>Navbar</div>
      <Outlet />
      <div>Footer</div>
    </>
  );
}

export default App;

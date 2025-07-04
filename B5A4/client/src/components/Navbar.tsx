import { Link, NavLink } from 'react-router';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'All Books', path: '/' },
    { label: 'Add Book', path: '/create-book' },
    { label: 'Borrow Summary', path: '/borrow-summary' },
  ];

  return (
    <nav className=" shadow-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-muted-foreground">
          Library📖
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-muted-foreground'
                } hover:text-blue-500 transition`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <MenuIcon />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner px-4 pb-4 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-800'
                } hover:text-blue-500 transition`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

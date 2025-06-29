import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold ">
        MyLogo
      </Link>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <ModeToggle />
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="text-lg ">
                Home
              </Link>
              <Link to="/about" className="text-lg ">
                About
              </Link>

              <Link to="/contact" className="text-lg ">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

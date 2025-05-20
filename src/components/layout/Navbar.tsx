
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, PawPrint, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <PawPrint className="h-8 w-8 text-vet-blue" />
          <span className="font-display font-bold text-xl text-vet-dark">
            Koney's <span className="text-vet-blue">Vet Hospital</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-vet-dark hover:text-vet-blue font-medium transition-custom"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/shop/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-vet-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link to="/appointment">
            <Button className="bg-vet-blue hover:bg-vet-teal">Book Appointment</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container-custom py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-vet-dark hover:text-vet-blue font-medium py-2 transition-custom"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2 border-t">
              <Link 
                to="/shop/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-vet-dark"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart (0)</span>
              </Link>
              <Link to="/appointment" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-vet-blue hover:bg-vet-teal w-full">Book Appointment</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

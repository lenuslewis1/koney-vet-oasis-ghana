
import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Phone, MapPin, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-vet-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PawPrint className="h-7 w-7 text-vet-teal" />
              <span className="font-display font-bold text-xl">
                Koney's <span className="text-vet-teal">Vet Hospital</span>
              </span>
            </div>
            <p className="text-gray-300">
              Providing exceptional veterinary care for your beloved pets in Accra, Ghana since 2010.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://facebook.com" className="hover:text-vet-teal transition-custom">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="hover:text-vet-teal transition-custom">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-vet-teal transition-custom">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-vet-teal transition-custom">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-vet-teal transition-custom">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-vet-teal transition-custom">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-vet-teal transition-custom">
                  Pet Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-vet-teal transition-custom">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/services#vaccinations" 
                  className="text-gray-300 hover:text-vet-teal transition-custom"
                >
                  Vaccinations
                </Link>
              </li>
              <li>
                <Link 
                  to="/services#surgery" 
                  className="text-gray-300 hover:text-vet-teal transition-custom"
                >
                  Surgery
                </Link>
              </li>
              <li>
                <Link 
                  to="/services#deworming" 
                  className="text-gray-300 hover:text-vet-teal transition-custom"
                >
                  Deworming
                </Link>
              </li>
              <li>
                <Link 
                  to="/services#grooming" 
                  className="text-gray-300 hover:text-vet-teal transition-custom"
                >
                  Pet Grooming
                </Link>
              </li>
              <li>
                <Link 
                  to="/services#consultation" 
                  className="text-gray-300 hover:text-vet-teal transition-custom"
                >
                  Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-vet-teal shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Veterinary Road, East Legon, Accra, Ghana
                </span>
              </li>
              <li>
                <a 
                  href="tel:+233301234567" 
                  className="flex items-center gap-3 text-gray-300 hover:text-vet-teal transition-custom"
                >
                  <Phone className="h-5 w-5 text-vet-teal" />
                  <span>+233 30 123 4567</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@koneysvet.com" 
                  className="flex items-center gap-3 text-gray-300 hover:text-vet-teal transition-custom"
                >
                  <Mail className="h-5 w-5 text-vet-teal" />
                  <span>info@koneysvet.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Koney's Veterinary Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

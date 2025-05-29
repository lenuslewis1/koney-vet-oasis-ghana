import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

const Footer = () => {
  return (
    <footer className="bg-vet-blue text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <AnimatedElement variant="fadeIn" delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src="https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748536540/koneys_veterinary_hospital_white_g85n05.png" 
                  alt="Koney's Vet Hospital Logo" 
                  className="h-20 brightness-0 invert" 
                />
              </div>
              <p className="text-gray-300">
                Providing exceptional veterinary care for your beloved pets in Accra, Ghana since 2010.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <motion.a 
                  whileHover={{ scale: 1.2, color: '#00A7B5' }} 
                  href="https://www.facebook.com/profile.php?id=100079096176304" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-custom"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2, color: '#00A7B5' }} 
                  href="https://www.instagram.com/koney_s_veterinary_hospital/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-custom"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2, color: '#00A7B5' }} 
                  href="https://x.com/koneysvet20" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-custom"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2, color: '#00A7B5' }} 
                  href="https://www.tiktok.com/@koneysvethospital" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-custom"
                >
                  <i className="fab fa-tiktok h-5 w-5"></i>
                </motion.a>
              </div>
            </div>
          </AnimatedElement>

          {/* Quick Links */}
          <AnimatedElement variant="fadeIn" delay={0.2}>
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link to="/" className="text-gray-300 hover:text-vet-teal transition-custom block">
                      Home
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link to="/about" className="text-gray-300 hover:text-vet-teal transition-custom block">
                      About Us
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link to="/services" className="text-gray-300 hover:text-vet-teal transition-custom block">
                      Services
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link to="/shop" className="text-gray-300 hover:text-vet-teal transition-custom block">
                      Pet Shop
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link to="/contact" className="text-gray-300 hover:text-vet-teal transition-custom block">
                      Contact Us
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>
          </AnimatedElement>

          {/* Services */}
          <AnimatedElement variant="fadeIn" delay={0.3}>
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link 
                      to="/services#vaccinations" 
                      className="text-gray-300 hover:text-vet-teal transition-custom block"
                    >
                      Vaccinations
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link 
                      to="/services#surgery" 
                      className="text-gray-300 hover:text-vet-teal transition-custom block"
                    >
                      Surgery
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link 
                      to="/services#deworming" 
                      className="text-gray-300 hover:text-vet-teal transition-custom block"
                    >
                      Deworming
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link 
                      to="/services#grooming" 
                      className="text-gray-300 hover:text-vet-teal transition-custom block"
                    >
                      Pet Grooming
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link 
                      to="/services#consultation" 
                      className="text-gray-300 hover:text-vet-teal transition-custom block"
                    >
                      Consultations
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>
          </AnimatedElement>

          {/* Contact Info */}
          <AnimatedElement variant="fadeIn" delay={0.4}>
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin className="h-5 w-5 text-vet-teal shrink-0 mt-0.5" />
                  </motion.div>
                  <span className="text-gray-300">
                    House #12 Swaniker Street, Abelempke, Accra Ghana
                  </span>
                </li>
                <li>
                  <motion.a 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    href="tel:+233533734385" 
                    className="flex items-center gap-3 text-gray-300 hover:text-vet-teal transition-custom"
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Phone className="h-5 w-5 text-vet-teal" />
                    </motion.div>
                    <span>053 373 4385</span>
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    href="mailto:info@koneysvet.com" 
                    className="flex items-center gap-3 text-gray-300 hover:text-vet-teal transition-custom"
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Mail className="h-5 w-5 text-vet-teal" />
                    </motion.div>
                    <span>info@koneysvet.com</span>
                  </motion.a>
                </li>
              </ul>
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement variant="fadeIn" delay={0.5}>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Koney's Veterinary Hospital. All rights reserved.</p>
          </div>
        </AnimatedElement>
      </div>
    </footer>
  );
};

export default Footer;

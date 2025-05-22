
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const backgroundControls = useAnimation();
  
  useEffect(() => {
    // Start the animation sequence
    const animateBackground = async () => {
      await backgroundControls.start({
        opacity: 0.3,
        scale: 1.05,
        transition: { duration: 2.5, ease: 'easeOut' }
      });
      
      // Subtle continuous movement
      backgroundControls.start({
        scale: [1.05, 1.08, 1.05],
        transition: {
          duration: 20,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse'
        }
      });
    };
    
    animateBackground();
  }, [backgroundControls]);
  
  return (
    <div className="relative bg-gradient-to-r from-vet-blue/90 to-vet-teal/90 text-white py-32 md:py-48 lg:py-64 min-h-[90vh] flex items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 1 }}
        animate={backgroundControls}
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzmvzdcpx/image/upload/v1747825781/_MG_2479_lojmf6.jpg')] bg-cover bg-center"
      ></motion.div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AnimatedElement variant="slideUp" delay={0.2}>
              <div className="mb-2">
                <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium inline-block">
                  Trusted Veterinary Care in Accra
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Caring For Your <span className="text-vet-coral">Pets</span> Like Family
              </h1>
            </AnimatedElement>
            
            <AnimatedElement variant="slideUp" delay={0.4}>
              <p className="text-lg md:text-xl opacity-90">
                Welcome to Koney's Veterinary Hospital in Accra — providing exceptional care for your beloved pets with compassion and expertise.
              </p>
            </AnimatedElement>
            
            <AnimatedElement variant="slideUp" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/appointment">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-vet-coral hover:bg-vet-coral/90 text-white rounded-full px-6 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>Book Appointment</span>
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/services">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="text-white bg-vet-teal border-white hover:bg-vet-teal/50 rounded-full px-6 flex items-center gap-2">
                      <span>Explore Our Services</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeIn" delay={0.8}>
              <div className="grid grid-cols-3 gap-4 mt-12 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-center p-3">
                  <h3 className="text-2xl font-bold text-vet-coral">10+</h3>
                  <p className="text-sm">Years Experience</p>
                </div>
                <div className="text-center p-3 border-x border-white/20">
                  <h3 className="text-2xl font-bold text-vet-coral">5000+</h3>
                  <p className="text-sm">Pets Treated</p>
                </div>
                <div className="text-center p-3">
                  <h3 className="text-2xl font-bold text-vet-coral">15+</h3>
                  <p className="text-sm">Expert Vets</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          <AnimatedElement variant="slideRight" delay={0.5} className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-vet-coral rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-vet-teal rounded-full opacity-20"></div>
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="bg-white p-3 rounded-lg shadow-xl relative z-10"
              >
                <img 
                  src="https://res.cloudinary.com/dzmvzdcpx/image/upload/v1747825781/_MG_2479_lojmf6.jpg" 
                  alt="Veterinarian with dog" 
                  className="rounded-md w-full h-[400px] object-cover"
                />
              </motion.div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

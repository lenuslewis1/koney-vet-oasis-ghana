
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-vet-blue to-vet-teal text-white py-20 md:py-28">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzmvzdcpx/image/upload/v1747825781/_MG_2479_lojmf6.jpg')] bg-cover bg-center"
      ></motion.div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-xl space-y-6">
          <AnimatedElement variant="slideUp" delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Caring For Your Pets Like Family
            </h1>
          </AnimatedElement>
          
          <AnimatedElement variant="slideUp" delay={0.4}>
            <p className="text-lg md:text-xl opacity-90">
              Welcome to Koney's Veterinary Hospital in Accra — providing exceptional care for your beloved pets with compassion and expertise.
            </p>
          </AnimatedElement>
          
          <AnimatedElement variant="slideUp" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-white text-vet-blue hover:bg-gray-100 hover:text-vet-teal">
                    Our Services
                  </Button>
                </motion.div>
              </Link>
              <Link to="/shop">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
                    Shop Products
                  </Button>
                </motion.div>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

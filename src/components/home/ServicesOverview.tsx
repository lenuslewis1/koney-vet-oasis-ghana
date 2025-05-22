
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import { PawPrint, Scissors, Syringe, Stethoscope, Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';

const services = [
  {
    id: 'preventative',
    title: 'Preventative Care',
    description: 'Regular check-ups and preventative treatments to keep your pets healthy.',
    icon: PawPrint,
  },
  {
    id: 'vaccinations',
    title: 'Vaccinations',
    description: 'Essential vaccines to protect your pets against common diseases.',
    icon: Syringe,
  },
  {
    id: 'surgery',
    title: 'Surgery',
    description: 'From routine procedures to complex surgeries for all pets.',
    icon: Stethoscope,
  },
  {
    id: 'grooming',
    title: 'Pet Grooming',
    description: 'Professional grooming services to keep your pets clean and healthy.',
    icon: Scissors,
  },
  {
    id: 'kennel',
    title: 'Boarding Services',
    description: 'Safe and comfortable accommodation for your pets while you\'re away.',
    icon: Dog,
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-16 bg-vet-light">
      <div className="container-custom">
        <AnimatedElement variant="fadeIn">
          <SectionHeading
            title="Our Veterinary Services"
            subtitle="What We Offer"
            centered={true}
          />
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedElement 
              key={service.id} 
              variant="scale" 
              delay={0.2 + (index * 0.1)}
            >
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="bg-white p-6 rounded-lg shadow-md transition-custom border border-gray-100 h-full"
              >
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-vet-teal/10 p-3 rounded-full w-fit mb-4"
                >
                  <service.icon className="h-6 w-6 text-vet-teal" />
                </motion.div>
                <h3 className="text-xl font-semibold text-vet-dark mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to={`/services#${service.id}`} className="text-vet-blue hover:text-vet-teal font-medium transition-custom inline-flex items-center">
                  <span>Learn More</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>
        
        <AnimatedElement variant="slideUp" delay={0.8}>
          <div className="text-center mt-10">
            <Link to="/services">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-vet-blue hover:bg-vet-teal">
                  View All Services
                </Button>
              </motion.div>
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ServicesOverview;

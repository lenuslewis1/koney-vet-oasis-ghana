
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import { PawPrint, Scissors, Syringe, Stethoscope, Dog, ArrowRight } from 'lucide-react';
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
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <AnimatedElement variant="slideUp">
              <div className="mb-4">
                <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                  What We Offer
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                Our Veterinary <span className="text-vet-teal">Services</span>
              </h2>
              <p className="text-gray-600 mb-6">
                We provide comprehensive veterinary care for all types of pets. Our team of experienced veterinarians and staff are dedicated to the health and well-being of your beloved animals.
              </p>
              <div className="mt-8">
                <Link to="/services">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-vet-blue hover:bg-vet-teal rounded-full px-6 flex items-center gap-2">
                      <span>All Services</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </AnimatedElement>
          </div>
          
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <AnimatedElement 
                  key={service.id} 
                  variant="scale" 
                  delay={0.2 + (index * 0.1)}
                >
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    className="bg-white p-6 rounded-lg shadow-md transition-custom border border-gray-100 h-full group"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="bg-vet-teal/10 p-3 rounded-full shrink-0"
                      >
                        <service.icon className="h-6 w-6 text-vet-teal" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-vet-dark mb-2 group-hover:text-vet-teal transition-colors">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <Link to={`/services#${service.id}`} className="text-vet-blue hover:text-vet-teal font-medium transition-custom inline-flex items-center">
                          <span>Learn More</span>
                          <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            className="ml-1"
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ArrowRight className="h-4 w-4 inline" />
                          </motion.span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
        
        {/* We've moved the button to the left column */}
      </div>
    </section>
  );
};

export default ServicesOverview;

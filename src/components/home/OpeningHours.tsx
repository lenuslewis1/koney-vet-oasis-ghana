import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Clock, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const hours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 7:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 2:00 PM' },
  { day: 'Holidays', hours: 'Emergency Services Only' },
];

const OpeningHours = () => {
  return (
    <section className="py-20 bg-vet-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <AnimatedElement variant="slideUp">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-vet-coral rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-vet-teal rounded-full opacity-20"></div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-3 rounded-lg shadow-xl relative z-10 overflow-hidden"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1591326303148-d4c7778a6754?auto=format&fit=crop&w=1000&q=80" 
                    alt="Veterinary clinic reception" 
                    className="rounded-md w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-4 rounded-md">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="bg-vet-teal/10 p-2 rounded-full">
                          <Phone className="h-4 w-4 text-vet-teal" />
                        </div>
                        <span className="text-sm font-medium">053 373 4385</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-vet-teal/10 p-2 rounded-full">
                          <MapPin className="h-4 w-4 text-vet-teal" />
                        </div>
                        <span className="text-sm font-medium">House #12 Swaniker Street, Abelempke, Accra Ghana</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedElement>
          </div>
          
          <div className="lg:col-span-5">
            <AnimatedElement variant="slideUp" delay={0.2}>
              <div className="mb-4">
                <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                  Working Hours
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                Opening <span className="text-vet-teal">Hours</span>
              </h2>
              <p className="text-gray-600 mb-8">
                We are available to care for your pets during the following hours. 
                For emergencies outside these hours, please call our emergency line.
              </p>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="divide-y divide-gray-100">
                  {hours.map((item, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-vet-teal" />
                        <span className="font-medium">{item.day}</span>
                      </div>
                      <span className="text-vet-blue font-semibold">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-vet-blue hover:bg-vet-teal text-white rounded-full px-6">
                      Contact Us
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;

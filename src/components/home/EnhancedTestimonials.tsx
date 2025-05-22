import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Abena Mensah',
    role: 'Dog Owner',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    text: 'The care my dog received at Koney\'s Veterinary Hospital was exceptional. The staff was knowledgeable, compassionate, and took the time to explain everything to me. I wouldn\'t trust my pet\'s health to anyone else!',
  },
  {
    id: 2,
    name: 'Kwame Osei',
    role: 'Cat Owner',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    text: 'I\'ve been bringing my cats to Koney\'s for years, and I\'ve always been impressed with the level of care they receive. The veterinarians are thorough and genuinely care about the well-being of my pets.',
  },
  {
    id: 3,
    name: 'Ama Darko',
    role: 'Multiple Pet Owner',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'As someone with multiple pets, finding a veterinary hospital that can handle all their needs is crucial. Koney\'s has been a lifesaver, providing excellent care for my dogs, cats, and even my parrot!',
  },
  {
    id: 4,
    name: 'Kofi Annan',
    role: 'Exotic Pet Owner',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    text: 'Finding a vet who knows how to treat exotic pets can be challenging, but the team at Koney\'s is knowledgeable about all species. They\'ve provided excellent care for my iguana and have been a valuable resource.',
  },
];

const EnhancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-vet-blue to-vet-teal text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedElement variant="slideUp">
            <div className="mb-4">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium inline-block">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              What Our <span className="text-vet-coral">Clients</span> Say About Us
            </h2>
            <p className="opacity-90 mb-8">
              We take pride in providing exceptional veterinary care that makes a difference in the lives of pets and their owners. 
              Here's what some of our clients have to say about their experience with Koney's Veterinary Hospital.
            </p>
            
            <div className="flex space-x-2 mt-8">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </AnimatedElement>
          
          <div className="relative h-[400px]">
            <div className="absolute top-0 left-0 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg p-8 text-vet-dark shadow-xl relative h-full"
                >
                  <Quote className="h-12 w-12 text-vet-teal/20 absolute top-6 left-6" />
                  
                  <div className="flex flex-col h-full justify-between z-10 relative">
                    <p className="text-lg italic mb-8 pt-8 text-gray-700">
                      {testimonials[currentIndex].text}
                    </p>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-vet-teal/20"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold text-vet-dark">{testimonials[currentIndex].name}</h4>
                        <p className="text-vet-teal">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;

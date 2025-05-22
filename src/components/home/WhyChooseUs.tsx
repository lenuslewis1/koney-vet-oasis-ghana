import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Shield, Clock, Award, Heart, Users, Stethoscope } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Trusted Care',
    description: 'Our team of experienced veterinarians provides trusted, reliable care for your pets.'
  },
  {
    icon: Clock,
    title: 'Emergency Services',
    description: 'We offer emergency veterinary services when your pet needs urgent medical attention.'
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'We maintain the highest standards of veterinary practice and pet care.'
  },
  {
    icon: Heart,
    title: 'Compassionate Approach',
    description: 'We treat your pets with the love and compassion they deserve.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our staff includes specialists in various aspects of veterinary medicine.'
  },
  {
    icon: Stethoscope,
    title: 'Modern Equipment',
    description: 'We use state-of-the-art equipment for diagnosis and treatment.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-vet-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <AnimatedElement variant="slideUp">
              <div className="mb-4">
                <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                Providing <span className="text-vet-teal">Best Care</span> For Your Beloved Pets
              </h2>
              <p className="text-gray-600 mb-8">
                At Koney's Veterinary Hospital, we understand that your pets are family members. 
                That's why we provide comprehensive, compassionate care to ensure their health and happiness.
              </p>
              
              <div className="relative mt-10">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-vet-coral rounded-full opacity-20"></div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-3 rounded-lg shadow-xl relative z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" 
                    alt="Veterinarian caring for pet" 
                    className="rounded-md w-full h-[300px] object-cover"
                  />
                </motion.div>
              </div>
            </AnimatedElement>
          </div>
          
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <AnimatedElement 
                  key={index} 
                  variant="fadeIn" 
                  delay={0.1 * index}
                >
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    className="bg-white p-6 rounded-lg shadow-md transition-custom border border-gray-100 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-vet-teal/10 p-3 rounded-full shrink-0">
                        <feature.icon className="h-6 w-6 text-vet-teal" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-vet-dark mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

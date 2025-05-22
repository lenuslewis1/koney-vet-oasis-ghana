
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { Shield, Award, Heart, Check } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Samuel Koney',
    role: 'Founder & Lead Veterinarian',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Dr. Koney founded the hospital in 2010 after practicing for 15 years. He specializes in small animal medicine and surgery.',
  },
  {
    id: 2,
    name: 'Dr. Abena Mensah',
    role: 'Senior Veterinarian',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'With over 10 years of experience, Dr. Mensah specializes in avian and exotic pet medicine.',
  },
  {
    id: 3,
    name: 'Dr. Kwame Nkrumah',
    role: 'Veterinary Surgeon',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Dr. Nkrumah is our surgical specialist, with particular expertise in orthopedic procedures.',
  },
  {
    id: 4,
    name: 'Akosua Boateng',
    role: 'Veterinary Nurse',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    bio: 'Akosua has been with us since our founding and leads our nursing team with compassion and expertise.',
  },
  {
    id: 5,
    name: 'Kofi Adu',
    role: 'Pet Groomer',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    bio: 'Kofi is a certified pet groomer with a special talent for handling anxious pets.',
  },
  {
    id: 6,
    name: 'Ama Darko',
    role: 'Practice Manager',
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
    bio: 'Ama ensures that the hospital runs smoothly, coordinating our team and managing operations.',
  },
];

const About = () => {
  return (
    <MainLayout>
      <PageHeader
        title="About Us"
        description="Meet our dedicated team providing exceptional veterinary care since 2010"
        bgImage="https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'About Us', path: '/about' }]}
      />
      
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6">
              <AnimatedElement variant="slideUp">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-vet-coral rounded-full opacity-20"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-vet-teal rounded-full opacity-20"></div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-3 rounded-lg shadow-xl relative z-10"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=1200&q=80"
                      alt="Koney's Veterinary Hospital building"
                      className="rounded-md w-full h-[400px] object-cover"
                    />
                  </motion.div>
                </div>
              </AnimatedElement>
            </div>
            
            <div className="lg:col-span-6">
              <AnimatedElement variant="slideUp" delay={0.2}>
                <div className="mb-4">
                  <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                    Who We Are
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                  Our <span className="text-vet-teal">Story</span>
                </h2>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Founded in 2010 by Dr. Samuel Koney, our veterinary hospital has grown from a small clinic to a comprehensive pet care center serving the greater Accra area. What started as a dream to provide quality veterinary care in Ghana has evolved into a state-of-the-art facility with a team of dedicated professionals.
                  </p>
                  
                  <p className="text-gray-700">
                    Our mission is simple: to provide exceptional veterinary care with compassion and expertise. We believe that pets are family members who deserve the same level of medical attention and care as humans, and we work tirelessly to ensure their health and happiness.
                  </p>
                  
                  <p className="text-gray-700">
                    Over the years, we've expanded our services to include not just medical care but also grooming, boarding, and a comprehensive pet shop to meet all your pet needs in one place.
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-vet-coral">10+</h3>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-vet-coral">15+</h3>
                    <p className="text-sm text-gray-600">Veterinarians</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-vet-coral">5000+</h3>
                    <p className="text-sm text-gray-600">Happy Pets</p>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
          
          <div className="py-16 bg-vet-light mb-16">
            <div className="container-custom">
              <div className="text-center mb-12">
                <AnimatedElement variant="fadeIn">
                  <div className="mb-4 flex justify-center">
                    <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                      What We Believe
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                    Our Core <span className="text-vet-teal">Values</span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    These principles guide everything we do at Koney's Veterinary Hospital, ensuring the highest quality care for your pets.
                  </p>
                </AnimatedElement>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <AnimatedElement variant="fadeIn" delay={0.1}>
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    className="bg-white p-8 rounded-lg shadow-md border border-gray-100 h-full"
                  >
                    <div className="bg-vet-teal/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                      <Heart className="h-8 w-8 text-vet-teal" />
                    </div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-4">Compassionate Care</h3>
                    <p className="text-gray-600">
                      We treat every pet with the love and attention they deserve, understanding the special bond between pets and their owners.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Gentle handling techniques</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Stress-free environment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Empathetic approach</span>
                      </li>
                    </ul>
                  </motion.div>
                </AnimatedElement>
                
                <AnimatedElement variant="fadeIn" delay={0.2}>
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    className="bg-white p-8 rounded-lg shadow-md border border-gray-100 h-full"
                  >
                    <div className="bg-vet-teal/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                      <Award className="h-8 w-8 text-vet-teal" />
                    </div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-4">Medical Excellence</h3>
                    <p className="text-gray-600">
                      We commit to ongoing education and investing in modern equipment to provide the highest standard of veterinary medicine.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Advanced diagnostic tools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Continuing education</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Evidence-based medicine</span>
                      </li>
                    </ul>
                  </motion.div>
                </AnimatedElement>
                
                <AnimatedElement variant="fadeIn" delay={0.3}>
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    className="bg-white p-8 rounded-lg shadow-md border border-gray-100 h-full"
                  >
                    <div className="bg-vet-teal/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                      <Shield className="h-8 w-8 text-vet-teal" />
                    </div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-4">Client Education</h3>
                    <p className="text-gray-600">
                      We believe informed pet owners make better decisions, so we take time to educate and guide you through your pet's health journey.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Detailed explanations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Take-home resources</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-vet-coral" />
                        <span className="text-gray-700">Preventative care guidance</span>
                      </li>
                    </ul>
                  </motion.div>
                </AnimatedElement>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <div className="text-center mb-12">
              <AnimatedElement variant="fadeIn">
                <div className="mb-4 flex justify-center">
                  <span className="bg-vet-teal/10 text-vet-teal px-4 py-1 rounded-full text-sm font-medium inline-block">
                    Meet The Experts
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-vet-dark">
                  Our <span className="text-vet-teal">Team</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our team of experienced veterinarians and staff are dedicated to providing the highest quality care for your pets.
                </p>
              </AnimatedElement>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {teamMembers.map((member, index) => (
                <AnimatedElement 
                  key={member.id}
                  variant="fadeIn" 
                  delay={0.1 * index}
                >
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-custom group"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 relative">
                      <div className="absolute -top-5 right-6 bg-vet-teal text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>+</motion.span>
                      </div>
                      <h3 className="text-xl font-semibold text-vet-dark group-hover:text-vet-teal transition-colors">{member.name}</h3>
                      <p className="text-vet-coral font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </motion.div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-vet-blue to-vet-teal text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AnimatedElement variant="fadeIn" delay={0.1}>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-white">10+</h3>
                <p className="text-white/80">Years Experience</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeIn" delay={0.2}>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-white">15+</h3>
                <p className="text-white/80">Expert Veterinarians</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeIn" delay={0.3}>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-white">5000+</h3>
                <p className="text-white/80">Pets Treated</p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeIn" delay={0.4}>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-white">24/7</h3>
                <p className="text-white/80">Emergency Service</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;

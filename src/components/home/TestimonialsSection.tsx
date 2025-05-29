
import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Akosua Mensah',
    role: 'Dog Owner',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    text: 'Koney\'s Veterinary Hospital has been taking care of my German Shepherd for years. The staff is always friendly and professional, and Dr. Koney is incredibly knowledgeable. I wouldn\'t trust my pet\'s health to anyone else!',
  },
  {
    id: 2,
    name: 'Kwame Osei',
    role: 'Cat Owner',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    text: 'When my cat needed emergency surgery, the team at Koney\'s was there for us 24/7. They explained everything clearly and made a stressful situation manageable. My cat recovered quickly thanks to their exceptional care.',
  },
  {
    id: 3,
    name: 'Ama Darko',
    role: 'Multiple Pet Owner',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    text: 'With three dogs and two cats, finding quality veterinary care is essential. Koney\'s Veterinary Hospital provides compassionate care for all my pets and even remembers their names! Their pet shop also has everything I need.',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-teal">
      <div className="container-custom">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Testimonials"
          centered={true}
        />
        
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-4">{testimonials[currentIndex].text}</p>
              
              <div>
                <h4 className="font-semibold text-vet-dark">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-500">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mt-8">
            <Button 
              onClick={prevTestimonial} 
              variant="outline" 
              size="icon" 
              className="h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={nextTestimonial} 
              variant="outline" 
              size="icon" 
              className="h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

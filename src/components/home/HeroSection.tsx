
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-vet-blue to-vet-teal text-white py-20 md:py-28">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            Caring For Your Pets Like Family
          </h1>
          
          <p className="text-lg md:text-xl opacity-90">
            Welcome to Koney's Veterinary Hospital in Accra — providing exceptional care for your beloved pets with compassion and expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/appointment">
              <Button size="lg" className="bg-white text-vet-blue hover:bg-gray-100 hover:text-vet-teal">
                Book Appointment
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-vet-blue to-vet-teal text-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Ready to Give Your Pet the Care They Deserve?
          </h2>
          
          <p className="text-lg opacity-90">
            Our team of experienced veterinarians is ready to provide the best care for your beloved companions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services">
              <Button size="lg" className="bg-white text-vet-blue hover:bg-gray-100">
                Explore Our Services
              </Button>
            </Link>
            
            <Link to="tel:+233533734385">
              <Button variant="outline" size="lg" className="border-white bg-vet-teal text-white hover:bg-vet-teal/20 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

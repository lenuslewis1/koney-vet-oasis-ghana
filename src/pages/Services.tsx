
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import CtaSection from '@/components/home/CtaSection';
import { services } from '@/data/services';

// Services are imported from data/services.ts

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash links for jumping to specific service sections
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <MainLayout>
      <PageHeader
        title="Our Services"
        description="Comprehensive veterinary care for your beloved pets"
        bgImage="https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=2000&q=80"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <SectionHeading 
            title="Services We Offer"
            subtitle="Professional Pet Care"
            centered={true}
            className="mb-12"
          />
          
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 !== 0 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 !== 0 ? 'lg:col-start-2' : ''}>
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                </div>
                
                <div>
                  <div className="bg-vet-teal/10 p-3 rounded-full w-fit mb-4">
                    <service.icon className="h-6 w-6 text-vet-teal" />
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-vet-dark mb-4">
                    {service.title}
                  </h2>
                  
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  
                  {service.pricing && (
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                      <div className="bg-vet-light rounded-lg p-4 inline-block">
                        <span className="font-semibold text-vet-blue">{service.pricing}</span>
                      </div>
                      <Link to={`/services/${service.id}`}>
                        <Button className="bg-vet-blue hover:bg-vet-teal">Learn More</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <CtaSection />
    </MainLayout>
  );
};

export default Services;

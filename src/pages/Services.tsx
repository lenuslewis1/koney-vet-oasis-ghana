
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { Syringe, Stethoscope, Scissors, Dog, PawPrint, Calendar } from 'lucide-react';
import CtaSection from '@/components/home/CtaSection';

const services = [
  {
    id: 'preventative',
    title: 'Preventative Care',
    description: 'Regular check-ups and preventative treatments are essential for maintaining your pet\'s health and catching potential issues early. Our comprehensive wellness exams include thorough physical assessments and personalized care recommendations.',
    icon: PawPrint,
    image: 'https://images.unsplash.com/photo-1551832586-4079ef0a8978?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵150 per visit'
  },
  {
    id: 'vaccinations',
    title: 'Vaccinations',
    description: 'Protect your pets from common and potentially fatal diseases with our vaccination programs. We offer core and non-core vaccines tailored to your pet\'s lifestyle and risk factors, following international veterinary guidelines.',
    icon: Syringe,
    image: 'https://images.unsplash.com/photo-1559000357-f6b52ddfcb99?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵120 per vaccination'
  },
  {
    id: 'surgery',
    title: 'Surgical Services',
    description: 'Our surgical suite is equipped for a wide range of procedures, from routine spay/neuter surgeries to more complex operations. Our experienced veterinary surgeons use modern techniques and comprehensive pain management protocols for the safety and comfort of your pet.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1581590212809-c0c134d89a42?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵400 depending on procedure'
  },
  {
    id: 'grooming',
    title: 'Pet Grooming',
    description: 'Our professional grooming services keep your pets clean, comfortable and healthy. Services include bathing, haircuts, nail trimming, ear cleaning, and more. Our groomers are experienced with all breeds and coat types.',
    icon: Scissors,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵100 depending on size and breed'
  },
  {
    id: 'boarding',
    title: 'Boarding Services',
    description: 'When you need to travel, our boarding facility provides a safe, clean, and comfortable environment for your pets. We offer spacious enclosures, regular exercise, and the peace of mind that comes with veterinary supervision during your pet\'s stay.',
    icon: Dog,
    image: 'https://images.unsplash.com/photo-1541599713278-93b636ae8218?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵80 per night'
  },
  {
    id: 'consultation',
    title: 'Consultations',
    description: 'Our comprehensive consultation services address all aspects of pet health, from nutrition and behavior to managing chronic conditions and senior pet care. Our veterinarians take the time to listen to your concerns and develop customized care plans.',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    pricing: 'From GH₵120 per session'
  },
];

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
                    <div className="bg-vet-light rounded-lg p-4 inline-block">
                      <span className="font-semibold text-vet-blue">{service.pricing}</span>
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

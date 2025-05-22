import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { services } from '@/data/services';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <MainLayout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="mb-6">The service you're looking for doesn't exist.</p>
          <Link to="/services">
            <Button className="bg-vet-blue hover:bg-vet-teal">View All Services</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <Link to="/services" className="inline-flex items-center text-vet-blue hover:text-vet-teal mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src={service.image}
              alt={service.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="bg-vet-teal/10 p-3 rounded-full w-fit mb-4">
            <service.icon className="h-6 w-6 text-vet-teal" />
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-vet-dark mb-6">{service.title}</h1>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 mb-6">{service.description}</p>
            
            {service.longDescription && (
              <div className="mt-6">
                {service.longDescription.map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            )}

            {service.benefits && (
              <div className="mt-8">
                <h2 className="text-2xl font-display font-bold text-vet-dark mb-4">Benefits</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.process && (
              <div className="mt-8">
                <h2 className="text-2xl font-display font-bold text-vet-dark mb-4">What to Expect</h2>
                <ol className="list-decimal pl-6 space-y-4">
                  {service.process.map((step, index) => (
                    <li key={index} className="pl-2">
                      <h3 className="font-bold text-lg text-vet-dark">{step.title}</h3>
                      <p>{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {service.pricing && (
            <div className="bg-vet-light rounded-lg p-6 mb-8">
              <h2 className="text-xl font-display font-bold text-vet-dark mb-2">Pricing</h2>
              <p className="font-semibold text-vet-blue text-lg">{service.pricing}</p>
              {service.pricingDetails && (
                <div className="mt-3">
                  {service.pricingDetails.map((detail, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-200 py-2">
                      <span>{detail.name}</span>
                      <span className="font-medium">GH₵{detail.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {service.faqs && (
            <div className="mt-8 mb-12">
              <h2 className="text-2xl font-display font-bold text-vet-dark mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="font-bold text-lg text-vet-dark mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Link to="/services">
              <Button className="bg-vet-blue hover:bg-vet-teal">View All Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;

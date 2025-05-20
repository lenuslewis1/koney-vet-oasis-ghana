
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Contact Us"
        description="We're here to help with all your pet care needs"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading 
                title="Get in Touch"
                subtitle="We'd love to hear from you"
              />
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="bg-vet-teal/10 p-3 rounded-full h-fit">
                    <Phone className="h-6 w-6 text-vet-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-1">Phone</h3>
                    <p className="text-gray-600">+233 30 123 4567</p>
                    <p className="text-gray-600">+233 50 987 6543 (Emergency)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-vet-teal/10 p-3 rounded-full h-fit">
                    <Mail className="h-6 w-6 text-vet-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-1">Email</h3>
                    <p className="text-gray-600">info@koneysvet.com</p>
                    <p className="text-gray-600">appointments@koneysvet.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-vet-teal/10 p-3 rounded-full h-fit">
                    <MapPin className="h-6 w-6 text-vet-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-1">Location</h3>
                    <p className="text-gray-600">123 Veterinary Road</p>
                    <p className="text-gray-600">East Legon, Accra, Ghana</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-vet-teal/10 p-3 rounded-full h-fit">
                    <Clock className="h-6 w-6 text-vet-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-vet-dark mb-1">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed (Emergency service available)</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden h-80 shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.4898808344076!2d-0.1817204!3d5.6340587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9c7ebaeaaaab%3A0x5e8c5056f07c6f49!2sEast%20Legon%2C%20Accra!5e0!3m2!1sen!2sgh!4v1621345678901!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Koney's Veterinary Hospital location"
                ></iframe>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <SectionHeading 
                  title="Send Us a Message"
                  subtitle="We'll respond as soon as possible"
                />
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-vet-blue hover:bg-vet-teal w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;

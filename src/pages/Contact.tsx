
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { saveContactMessage } from '@/lib/supabase';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Save contact message to Supabase
      const result = await saveContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to send message');
      }
      
      // Send notification using serverless function
      try {
        const response = await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'contact',
            name: formData.name,
            email: formData.email,
            // We'll still pass phone to the serverless function for notifications
            // even though we don't store it in the database
            phone: formData.phone || 'Not provided',
            message: formData.message
          })
        });
        
        if (!response.ok) {
          console.warn('Notification service returned an error, but form was submitted successfully');
        }
      } catch (notificationError) {
        console.warn('Failed to send notification, but form was submitted successfully:', notificationError);
      }
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    <p className="text-gray-600">053 373 4385</p>
                    <p className="text-gray-600">053 373 4385 (Emergency)</p>
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
                    <p className="text-gray-600">House #12 Swaniker Street</p>
                    <p className="text-gray-600">Abelempke, Accra, Ghana</p>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5203931350194!2d-0.21382492414694946!3d5.629863633121085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b5f12d3b0a7%3A0xf8a5b6b8a3f0a0c!2sAbelenkpe%2C%20Accra!5e0!3m2!1sen!2sgh!4v1716397970544!5m2!1sen!2sgh"
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


import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import AboutSection from '@/components/home/AboutSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import NotificationsPrompt from '@/components/home/NotificationsPrompt';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <div className="container-custom py-8">
        <NotificationsPrompt />
      </div>
      <ServicesOverview />
      <AboutSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CtaSection />
    </MainLayout>
  );
};

export default Index;

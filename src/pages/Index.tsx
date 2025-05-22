
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import AboutSection from '@/components/home/AboutSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';


const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CtaSection />
    </MainLayout>
  );
};

export default Index;

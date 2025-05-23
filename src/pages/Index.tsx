
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import AppointmentProcess from '@/components/home/AppointmentProcess';
import EmergencyServices from '@/components/home/EmergencyServices';
import OpeningHours from '@/components/home/OpeningHours';
import EnhancedTestimonials from '@/components/home/EnhancedTestimonials';
import AboutSection from '@/components/home/AboutSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CtaSection from '@/components/home/CtaSection';
import RecentBlogPosts from '@/components/home/RecentBlogPosts';


const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <AppointmentProcess />
      <EmergencyServices />
      <OpeningHours />
      <AboutSection />
      <FeaturedProducts />
      <RecentBlogPosts />
      <EnhancedTestimonials />
      <CtaSection />
    </MainLayout>
  );
};

export default Index;

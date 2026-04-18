import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import PrincipalMessage from '@/components/home/PrincipalMessage';
import AcademicExcellence from '@/components/home/AcademicExcellence';
import NewsEvents from '@/components/home/NewsEvents';
import StatsSection from '@/components/home/StatsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PrincipalMessage />
      <AcademicExcellence />
      <NewsEvents />
      <StatsSection />
    </>
  );
}

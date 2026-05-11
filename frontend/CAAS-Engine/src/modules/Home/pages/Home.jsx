import { Container } from 'react-bootstrap';
import MainLayout from '../../Layout/components/MainLayout/MainLayout';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';

export default function Home(){
  return (
    <MainLayout hideSidebar>
      <Container className="py-5">
        <HeroSection />
        <FeaturesSection />
      </Container>
    </MainLayout>
  );
};
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import WeddingServicesSection from '@/components/home/WeddingServicesSection';
import HowToOrderSection from '@/components/home/HowToOrderSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CakeBuilderPromo from '@/components/CakeBuilderPromo';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CakeBuilderPromo />
      <CategoriesSection />
      <WeddingServicesSection />
      <HowToOrderSection />
      <TestimonialsSection />
    </div>
  );
}
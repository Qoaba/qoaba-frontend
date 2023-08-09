import React from 'react';
import { HeaderMegaMenu } from './components/Header';
import { FeaturesCards } from './components/HomeContent';
import { FooterLinks } from './components/Footer';

export default function Page() {
  const footerData = [
    {
      title: 'Products',
      links: [
        { label: 'Feature 1', link: '#' },
        { label: 'Feature 2', link: '#' },
        // Add more links as needed
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', link: '#' },
        { label: 'Tutorials', link: '#' },
        // Add more links as needed
      ],
    },
    // Add more groups as needed
  ];  

  return (
    <div>
      <HeaderMegaMenu />
      <FeaturesCards />
      <FooterLinks data={footerData} />
    </div>
  );
}


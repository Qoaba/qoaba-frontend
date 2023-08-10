import React from 'react';
import { HeaderMegaMenu } from './components/Header';
import { FeaturesCards } from './components/HomeContent';
import { FooterLinks } from './components/Footer';

export default function Page() {
  const footerData = [
    {
      title: 'Get started',
      links: [
        { label: 'Pricing', link: '#' },
        { label: 'Account', link: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', link: '#' },
        { label: 'Tutorials', link: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', link: '#' },
        { label: 'Contact', link: '#' },
      ],
    },
    {
      title: 'Qoaba',
      links: [
        { label: 'Questions', link: '#' },
        { label: 'Analysis', link: '#' },
      ],
    }
  ];  

  return (
    <div>
      <HeaderMegaMenu />
      <FeaturesCards />
      <FooterLinks data={footerData} />
    </div>
  );
}


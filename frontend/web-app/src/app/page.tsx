import React from 'react';
import { HeaderMenuColored } from './components/header';
import { FeaturesCards } from './components/content';

export default function Page() {
  const links = [
    {
      link: '/catalogue',
      label: 'Catalogue',
    },
    {
      link: '/community',
      label: 'Community',
    },
    {
      link: '/pricing',
      label: 'Pricing',
    },
    {
      link: '/account',
      label: 'Account',
    },
    {
      link: '/resources',
      label: 'Resources',
      links: [
        { link: '/about', label: 'About' },
        { link: '/settings', label: 'Settings' },
      ],
    },
    // Add more link objects as needed
  ];

  return (
    <div>
      <HeaderMenuColored links={links} />
      <FeaturesCards />
    </div>
  );
}


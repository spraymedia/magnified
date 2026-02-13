export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    full: string;
  };
  phone: string;
  phoneFormatted: string;
  email: string;
  social: {
    facebook: string;
  };
  hours: {
    weekdays: string;
    weekend: string;
    note: string;
  };
  afsl: string;
  founded: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services: {
    title: string;
    slug: string;
    description: string;
  }[];
  serviceAreas: {
    name: string;
    slug: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: 'Magnified SMSF Specialists',
  description:
    'Secure your financial future with expert SMSF compliance management, personalised support, and practical guidance tailored to your fund\'s needs.',
  url: 'https://magnifiedsmsf.com.au',
  address: {
    street: 'Unit 2/106 Pinjarra Road',
    city: 'Mandurah',
    state: 'WA',
    postcode: '6210',
    country: 'Australia',
    full: 'Unit 2/106 Pinjarra Road, Mandurah WA 6210',
  },
  phone: '+61 (8) 9584 6677',
  phoneFormatted: '08 9584 6677',
  email: 'info@magnifiedsmsf.com.au',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61578271446627',
  },
  hours: {
    weekdays: '8:30 AM - 5:00 PM',
    weekend: 'Closed',
    note: 'After-hours appointments available by arrangement',
  },
  afsl: '430062',
  founded: '2006',
  coordinates: {
    lat: -32.5269,
    lng: 115.7217,
  },
  services: [
    {
      title: 'SMSF Setup and Administration',
      slug: 'smsf-setup-and-administration',
      description:
        'Seamlessly establish your Self-Managed Super Fund and manage its ongoing operations with expert guidance from day one.',
    },
    {
      title: 'Financial Reporting and Compliance',
      slug: 'financial-reporting-and-compliance',
      description:
        'Ensure your SMSF adheres to all regulatory requirements with accurate financial reporting and proactive compliance management.',
    },
    {
      title: 'Tax Strategies and Optimisation',
      slug: 'tax-strategies-and-optimisation',
      description:
        'Support your fund\'s tax compliance with strategies to structure your SMSF efficiently within the rules.',
    },
    {
      title: 'Strategic SMSF Compliance & Investment Implementation',
      slug: 'strategic-smsf-compliance-and-investment-implementation',
      description:
        'Prepare and maintain your SMSF investment strategy documentation to meet regulatory obligations and reflect your trustee decisions.',
    },
  ],
  serviceAreas: [
    { name: 'Mandurah', slug: 'mandurah-smsf-specialists' },
    { name: 'Perth Metro', slug: 'perth-smsf-specialists' },
    { name: 'Margaret River', slug: 'margaret-river-smsf-specialists' },
    { name: 'Midwest', slug: 'midwest-wa-smsf-specialists' },
    { name: 'Regional WA', slug: 'regional-wa-smsf-specialists' },
  ],
};

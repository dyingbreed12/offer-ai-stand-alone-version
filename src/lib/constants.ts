// src/lib/constants.ts

import { Property } from './types';

export const STORAGE_KEYS = {
  OFFERS: 'offer_ai_bot_offers',
  SETTINGS: 'offer_ai_bot_settings', // Not used yet, but good to keep
};

export const MOCK_OPPORTUNITIES: Property[] = [
  {
    id: '1',
    name: 'Fix & Flip - Downtown Phoenix',
    address: '123 Main St, Phoenix, AZ 85001',
    arv: 325000,
    repairs: 45000,
    status: 'Open',
  },
  {
    id: '2',
    name: 'Wholesale Deal - Suburban Scottsdale',
    address: '456 Oak Ave, Scottsdale, AZ 85260',
    arv: 485000,
    repairs: 35000,
    status: 'In Progress',
  },
  {
    id: '3',
    name: 'Rental Property Investment',
    address: '789 Pine Rd, Tempe, AZ 85281',
    arv: 390000,
    repairs: 28000,
    status: 'Open',
  },
  {
    id: '4',
    name: 'Duplex Investment Opportunity',
    address: '101 Elm St, Mesa, AZ 85201',
    arv: 520000,
    repairs: 65000,
    status: 'Open',
  },
  {
    id: '5',
    name: 'Single Family Rehab',
    address: '222 Maple Dr, Chandler, AZ 85224',
    arv: 425000,
    repairs: 55000,
    status: 'Open',
  },
];

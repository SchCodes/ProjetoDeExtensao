import type { Dog, LeadAdoption, LeadVolunteer, Partner, Post, Result, Settings } from '@/types';
import { defaultFlags } from './featureFlags';
import { defaultSettings } from './settings';

export const mockDogs: Dog[] = [
  {
    id: 'bella',
    name: 'Bella',
    age: 2,
    size: 'M',
    tags: ['vacinado', 'castrado', 'dócil'],
    status: 'disponível',
    description: 'Bella é uma cadelinha carinhosa que ama brincar e receber carinho.',
    photos: ['/images/dogs/bella-1.jpg'],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'max',
    name: 'Max',
    age: 4,
    size: 'G',
    tags: ['castrado', 'calmo'],
    status: 'disponível',
    description: 'Max é tranquilo e se dá bem com outros cães.',
    photos: ['/images/dogs/max-1.jpg'],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'luna',
    name: 'Luna',
    age: 1.5,
    size: 'P',
    tags: ['vacinado', 'energético'],
    status: 'disponível',
    description: 'Luna é cheia de energia e vai alegrar o seu lar.',
    photos: ['/images/dogs/luna-1.jpg'],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const mockPosts: Post[] = [
  {
    id: 'historia-bella',
    type: 'story',
    title: 'Bella encontrou uma nova família',
    summary: 'Graças às doações, Bella recebeu tratamento e hoje está adotada.',
    body: 'Bella chegou tímida, mas conquistou todos com seu carinho.',
    photos: ['/images/posts/bella-story.jpg'],
    date: Date.now() - 1000 * 60 * 60 * 24 * 7
  },
  {
    id: 'campanha-ração',
    type: 'care',
    title: 'Campanha de ração superou a meta',
    summary: 'Arrecadamos 200kg de ração para os cães resgatados.',
    body: 'Obrigado a todos os doadores!',
    date: Date.now() - 1000 * 60 * 60 * 24 * 14
  }
];

export const mockPartners: Partner[] = [
  {
    id: 'pet-shop-alegria',
    name: 'Pet Shop Alegria',
    logoUrl: '/images/partners/petshop-alegria.svg',
    siteUrl: 'https://example.com',
    active: true
  },
  {
    id: 'clinica-vet-care',
    name: 'Clínica Vet Care',
    logoUrl: '/images/partners/vet-care.svg',
    siteUrl: 'https://example.com',
    active: true
  }
];

export const mockResults: Result[] = [
  {
    id: '2025-09',
    helpedCount: 18,
    notes: 'Setembro trouxe muitas adoções e lares temporários.'
  }
];

export const mockAdoptionLeads: LeadAdoption[] = [];
export const mockVolunteerLeads: LeadVolunteer[] = [];

export const mockFlags = defaultFlags;
export const mockSettings: Settings = defaultSettings;

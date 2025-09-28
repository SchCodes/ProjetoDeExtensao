export type DogSize = 'P' | 'M' | 'G';
export type DogStatus = 'disponível' | 'adotado' | 'indisponível';
export type PostType = 'rescue' | 'care' | 'story';

export interface Dog {
  id: string;
  name: string;
  age: number;
  size: DogSize;
  tags: string[];
  status: DogStatus;
  description: string;
  photos: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  summary: string;
  body: string;
  photos?: string[];
  date: number;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  siteUrl: string;
  active: boolean;
}

export interface Result {
  id: string;
  helpedCount: number;
  notes?: string;
}

export interface LeadAdoption {
  id: string;
  dogId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: number;
}

export interface LeadVolunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  createdAt: number;
}

export interface Flags {
  adoption: boolean;
  donations: boolean;
  lostPets: boolean;
  partners: boolean;
  stories: boolean;
  volunteers: boolean;
}

export interface Settings {
  contact: string;
  pixKey: string;
  donationNotes?: string;
  seasonalBanner?: string;
}

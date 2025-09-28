import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import {
  mockAdoptionLeads,
  mockDogs,
  mockVolunteerLeads
} from '@/config/mocks';
import { firestore, hasFirestore } from '@/lib/firebase/firestore';
import type { Dog, DogStatus, LeadAdoption, LeadVolunteer } from '@/types';

const DOGS_COLLECTION = 'dogs';
const LEADS_ADOPTION_COLLECTION = 'leads_adoption';
const LEADS_VOLUNTEER_COLLECTION = 'leads_volunteer';

export const fetchDogs = async (status: DogStatus = 'disponível'): Promise<Dog[]> => {
  if (!hasFirestore() || !firestore) {
    return mockDogs.filter((dog) => dog.status === status);
  }

  const q = query(collection(firestore, DOGS_COLLECTION), where('status', '==', status));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Dog));
};

export const fetchDogById = async (id: string): Promise<Dog | null> => {
  if (!hasFirestore() || !firestore) {
    return mockDogs.find((dog) => dog.id === id) ?? null;
  }

  const ref = doc(firestore, DOGS_COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() } as Dog;
};

export const createAdoptionLead = async (
  payload: Omit<LeadAdoption, 'id' | 'createdAt'>
): Promise<void> => {
  if (!hasFirestore() || !firestore) {
    mockAdoptionLeads.push({ id: String(mockAdoptionLeads.length + 1), createdAt: Date.now(), ...payload });
    console.warn('[leads_adoption] Firebase não configurado. Lead salvo apenas em memória.');
    return;
  }

  await addDoc(collection(firestore, LEADS_ADOPTION_COLLECTION), {
    ...payload,
    createdAt: Date.now()
  });
};

export const createVolunteerLead = async (
  payload: Omit<LeadVolunteer, 'id' | 'createdAt'>
): Promise<void> => {
  if (!hasFirestore() || !firestore) {
    mockVolunteerLeads.push({ id: String(mockVolunteerLeads.length + 1), createdAt: Date.now(), ...payload });
    console.warn('[leads_volunteer] Firebase não configurado. Lead salvo apenas em memória.');
    return;
  }

  await addDoc(collection(firestore, LEADS_VOLUNTEER_COLLECTION), {
    ...payload,
    createdAt: Date.now()
  });
};

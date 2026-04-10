// lib/events.ts
import { Event } from '@/types/event';

export const events: Event[] = [
  {
    id: '1',
    title: 'Prenatal Care Workshop',
    description: 'Comprehensive workshop covering essential prenatal care, nutrition, and preparation for childbirth. Learn from experienced midwives and healthcare professionals.',
    date: new Date('2024-02-15'),
    time: '10:00 AM - 2:00 PM',
    location: 'Kigali Convention Center',
    category: 'workshop',
    price: 0,
    capacity: 50,
    registered: 42,
    speaker: 'Dr. Marie Uwase',
    duration: '4 hours'
  },
  {
    id: '2',
    title: 'New Parents Support Group',
    description: 'Join other new parents to share experiences, challenges, and tips. Professional counselors will be available to provide guidance and support.',
    date: new Date('2024-02-20'),
    time: '3:00 PM - 5:00 PM',
    location: 'Umubyeyi Community Center',
    category: 'support-group',
    price: 0,
    capacity: 30,
    registered: 28,
    duration: '2 hours'
  },
  {
    id: '3',
    title: 'Child Nutrition Seminar',
    description: 'Learn about proper nutrition for children aged 0-5 years. Topics include breastfeeding, introducing solids, and dealing with picky eaters.',
    date: new Date('2024-02-25'),
    time: '9:00 AM - 12:00 PM',
    location: 'Kacyiru Health Center',
    category: 'seminar',
    price: 5000,
    capacity: 40,
    registered: 35,
    speaker: 'Nutritionist Alice Mukamana',
    duration: '3 hours'
  },
  {
    id: '4',
    title: 'Mental Health for Mothers',
    description: 'Discussion on postpartum mental health, stress management, and self-care strategies for new mothers.',
    date: new Date('2024-03-05'),
    time: '2:00 PM - 4:00 PM',
    location: 'Online - Zoom',
    category: 'health',
    price: 0,
    capacity: 100,
    registered: 67,
    speaker: 'Psychologist Dr. Jean Habimana',
    duration: '2 hours'
  }
];
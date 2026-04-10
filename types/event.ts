// types/event.ts
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: 'workshop' | 'seminar' | 'support-group' | 'community' | 'health';
  image?: string;
  price: number;
  capacity: number;
  registered: number;
  speaker?: string;
  duration: string;
}
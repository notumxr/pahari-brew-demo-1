export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  tags?: string[];
  category: 'brews' | 'companions';
  image?: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
  aspect: 'large' | 'tall' | 'square' | 'wide';
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests?: string;
  code: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}


import { Service } from './types';
// Add icon imports for the ICON_MAP used in the Services component
import { Wind, Scissors, Sparkles, LucideIcon } from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: 'rasen',
    title: 'Rasen mähen',
    description: 'Fachgerechte Kürzung mit modernem Equipment für ein perfektes Schnittbild.',
    icon: 'Wind',
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hecke',
    title: 'Heckenschnitt',
    description: 'Sorgfältiger Form- und Rückschnitt Ihrer Hecken und Sträucher.',
    icon: 'Scissors',
    image: 'https://images.unsplash.com/photo-1558905619-171420d4f0c9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'reinigung',
    title: 'Terrassen-Reinigung',
    description: 'Befreiung Ihrer Wege und Terrassen von Moos, Unkraut und Schmutz.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1516211697149-d867c48c909e?auto=format&fit=crop&q=80&w=800'
  }
];

// Fix for: Module '"../constants"' has no exported member 'ICON_MAP'.
export const ICON_MAP: Record<string, LucideIcon> = {
  Wind: Wind,
  Scissors: Scissors,
  Sparkles: Sparkles,
};

// Fix for: Module '"../constants"' has no exported member 'TEAM'.
export const TEAM = [
  { name: 'Elia', role: 'Inhaber' },
  { name: 'Philipp', role: 'Gartenpflege' },
  { name: 'Jonas', role: 'Gartenpflege' },
  { name: 'Luca', role: 'Gartenpflege' },
];

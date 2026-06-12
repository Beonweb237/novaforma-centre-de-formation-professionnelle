export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export const stats: Stat[] = [
  {
    id: '1',
    value: 5000,
    suffix: '+',
    label: 'Stagiaires formes chaque annee',
    icon: 'Users',
  },
  {
    id: '2',
    value: 92,
    suffix: '%',
    label: 'Taux de satisfaction moyen',
    icon: 'Star',
  },
  {
    id: '3',
    value: 87,
    suffix: '%',
    label: 'Taux d\'insertion professionnelle',
    icon: 'Briefcase',
  },
  {
    id: '4',
    value: 120,
    suffix: '+',
    label: 'Formations dans 8 domaines',
    icon: 'BookOpen',
  },
];

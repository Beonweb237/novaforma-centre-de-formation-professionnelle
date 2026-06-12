export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'reconversion-digital-par-ou-commencer-2026',
    title: 'Reconversion dans le digital : par ou commencer en 2026 ?',
    excerpt: 'Le secteur du digital recrute plus que jamais. Voici un guide complet pour preparer votre transition vers les metiers tech les plus demandes.',
    tag: 'Conseils carriere',
    date: '15 janvier 2026',
    readTime: '8 min',
    image: '/formation-digital.jpg',
  },
  {
    id: '2',
    slug: 'cpf-opco-pole-emploi-quel-financement',
    title: 'CPF, OPCO, Pole emploi : quel financement choisir pour votre formation ?',
    excerpt: 'On vous explique les differences entre les principaux dispositifs de financement et comment maximiser vos aides.',
    tag: 'Financement',
    date: '10 janvier 2026',
    readTime: '6 min',
    image: '/formation-management.jpg',
  },
  {
    id: '3',
    slug: 'parcours-karim-restauration-developpement-web',
    title: 'De la restauration au developpement web : le parcours de Karim',
    excerpt: 'A 32 ans, Karim a tout lance pour devenir developpeur. Il raconte comment il a prepare sa reconversion et finance sa formation.',
    tag: 'Temoignages',
    date: '5 janvier 2026',
    readTime: '5 min',
    image: '/classroom.jpg',
  },
];

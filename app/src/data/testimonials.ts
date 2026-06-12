export interface Testimonial {
  id: string;
  name: string;
  training: string;
  quote: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    training: 'Developpeur Web Full Stack',
    quote: "En 6 mois, j'ai completement change de vie. J'etais vendeuse, aujourd'hui je suis developpeuse front-end dans une start-up tech. La formation etait intensive mais les formateurs etaient d'une patience infinie.",
    rating: 5,
    image: '/testimonial-1.jpg',
  },
  {
    id: '2',
    name: 'Thomas Martin',
    training: "Manager d'Equipe",
    quote: "J'ai suivi la formation Manager d'Equipe pour preparer une promotion. Non seulement j'ai eu le poste, mais mes relations avec mon equipe se sont transformees. Je recommande a 200%.",
    rating: 5,
    image: '/testimonial-2.jpg',
  },
  {
    id: '3',
    name: 'Amina Diallo',
    training: 'Data Analyst',
    quote: "La formation Data Analyst m'a permise de trouver un emploi dans le domaine de la data en moins de 2 mois apres l'obtention du diplome. L'alternance proposee est un vrai plus.",
    rating: 5,
    image: '/testimonial-3.jpg',
  },
];

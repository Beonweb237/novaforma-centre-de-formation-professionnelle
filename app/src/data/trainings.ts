export interface Training {
  id: string;
  slug: string;
  title: string;
  domain: string;
  domainColor: string;
  description: string;
  duration: string;
  format: string;
  level: string;
  price: number;
  cpfEligible: boolean;
  image: string;
}

export const trainings: Training[] = [
  {
    id: '1',
    slug: 'developpeur-web-full-stack',
    title: 'Developpeur Web Full Stack',
    domain: 'Digital / Informatique',
    domainColor: '#2563EB',
    description: 'Devenez developpeur web en 6 mois. HTML, CSS, JavaScript, React, Node.js. 100% des diplomes trouvent un emploi sous 3 mois.',
    duration: '6 mois',
    format: 'Presentiel / Distanciel',
    level: 'Niveau 5 (Bac+2)',
    price: 6500,
    cpfEligible: true,
    image: '/formation-digital.jpg',
  },
  {
    id: '2',
    slug: 'manager-equipe',
    title: "Manager d'Equipe",
    domain: 'Management / Leadership',
    domainColor: '#7C3AED',
    description: "Accompagnez vos equipes vers l'excellence. Communication, delegation, conflits, performance. 4 jours intensifs.",
    duration: '4 jours',
    format: 'Presentiel',
    level: 'Niveau 6 (Bac+3)',
    price: 2800,
    cpfEligible: true,
    image: '/formation-management.jpg',
  },
  {
    id: '3',
    slug: 'anglais-professionnel-toeic',
    title: 'Anglais Professionnel - Certification TOEIC',
    domain: 'Langues / Communication',
    domainColor: '#0891B2',
    description: 'Perfectionnez votre anglais professionnel. Cours du soir et week-end. Preparation TOEIC incluse. Niveaux B1 a C1.',
    duration: '12 semaines',
    format: 'Presentiel / Soir',
    level: 'Niveau 4 (Bac)',
    price: 1900,
    cpfEligible: true,
    image: '/classroom.jpg',
  },
  {
    id: '4',
    slug: 'data-analyst',
    title: 'Data Analyst',
    domain: 'Digital / Informatique',
    domainColor: '#2563EB',
    description: 'Maitrisez l\'analyse de donnees : Python, SQL, Power BI, Machine Learning. Alternance possible. 85% d\'insertion professionnelle.',
    duration: '8 mois',
    format: 'Presentiel / Alternance',
    level: 'Niveau 6 (Bac+3)',
    price: 8200,
    cpfEligible: true,
    image: '/formation-digital.jpg',
  },
  {
    id: '5',
    slug: 'cqp-agent-securite',
    title: 'CQP Agent de Securite',
    domain: 'Securite / Surete',
    domainColor: '#DC2626',
    description: 'Devenez agent de securite certifie. Formation reglementaire, SSIAP 1, gestion des conflits. Recrutement garanti.',
    duration: '3 mois',
    format: 'Presentiel',
    level: 'Niveau 3 (CAP)',
    price: 2400,
    cpfEligible: true,
    image: '/classroom.jpg',
  },
  {
    id: '6',
    slug: 'gestionnaire-paie',
    title: 'Gestionnaire de Paie',
    domain: 'Commerce / Vente',
    domainColor: '#059669',
    description: 'Maitrisez la paie et les declarations sociales. DSN, gestion des absences, contrats. 95% de taux de reussite.',
    duration: '6 mois',
    format: 'Presentiel / Distanciel',
    level: 'Niveau 5 (Bac+2)',
    price: 3600,
    cpfEligible: true,
    image: '/formation-management.jpg',
  },
];

export const domains = [
  {
    id: 'digital',
    title: 'Digital & Informatique',
    description: 'Developpement web, cyber securite, data, cloud, IA. Des formations a la pointe de la tech.',
    color: '#2563EB',
    icon: 'Monitor',
    slug: 'digital',
  },
  {
    id: 'management',
    title: 'Management & Leadership',
    description: 'Managez des equipes, pilotez des projets, devenez leader. De la certification au MBA.',
    color: '#7C3AED',
    icon: 'Users',
    slug: 'management',
  },
  {
    id: 'langues',
    title: 'Langues & Communication',
    description: 'Anglais, espagnol, FLE. Certification TOEIC, Cambridge, niveaux A1 a C2.',
    color: '#0891B2',
    icon: 'Globe',
    slug: 'langues',
  },
  {
    id: 'securite',
    title: 'Securite & Surete',
    description: 'CQP, SSIAP, CSE, sauveteur secouriste. Formations reglementaires et certifiantes.',
    color: '#DC2626',
    icon: 'Shield',
    slug: 'securite',
  },
  {
    id: 'btp',
    title: 'BTP & Construction',
    description: 'Gros oeuvre, electricite, plomberie, permis de construire. CAP a Bac Pro.',
    color: '#B45309',
    icon: 'HardHat',
    slug: 'btp',
  },
  {
    id: 'commerce',
    title: 'Commerce & Vente',
    description: 'Techniques de vente, merchandising, e-commerce, relation client.',
    color: '#059669',
    icon: 'ShoppingCart',
    slug: 'commerce',
  },
  {
    id: 'sante',
    title: 'Sante & Social',
    description: 'Aide-soignant, auxiliaire de puericulture, accompagnement personnes agees.',
    color: '#EC4899',
    icon: 'Heart',
    slug: 'sante',
  },
  {
    id: 'projet',
    title: 'Gestion de Projet',
    description: 'PRINCE2, Agile/Scrum, PMP, gestion d\'equipe. Certification internationale.',
    color: '#F97316',
    icon: 'FolderKanban',
    slug: 'projet',
  },
];

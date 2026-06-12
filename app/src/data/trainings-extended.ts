import type { Training } from './trainings';

export interface TrainingSession {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  spotsLeft: number;
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
}

export interface TrainingTrainer {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface TrainingDetail extends Training {
  shortDescription: string;
  durationHours: number;
  objectives: string[];
  prerequisites: string;
  certification: string;
  rncpCode?: string;
  satisfactionRate: number;
  certificationRate: number;
  insertionRate: number;
  averageRating: number;
  modules: TrainingModule[];
  sessions: TrainingSession[];
  modalitiesPresentiel: string[];
  modalitiesDistanciel: string[];
  modalitiesAlternance: string[];
  financingOptions: string[];
  trainer: TrainingTrainer;
  relatedSlugs: string[];
}

export const trainingsExtended: TrainingDetail[] = [
  {
    ...({} as Training),
    id: '1',
    slug: 'developpeur-web-full-stack',
    title: 'Developpeur Web Full Stack',
    domain: 'Digital / Informatique',
    domainColor: '#2563EB',
    description: 'La formation Developpeur Web Full Stack vous prepare au titre professionnel de niveau 5 (Bac+2). En 6 mois intensifs, vous maitrisez les technologies front-end (HTML5, CSS3, JavaScript, React) et back-end (Node.js, Express, MongoDB, SQL). Vous apprenez a concevoir, developper et deployer des applications web completes, du prototype a la mise en production.',
    shortDescription: 'Devenez developpeur web en 6 mois. HTML, CSS, JavaScript, React, Node.js. 100% des diplomes trouvent un emploi sous 3 mois.',
    duration: '6 mois',
    durationHours: 840,
    format: 'Presentiel / Distanciel',
    level: 'Niveau 5 (Bac+2)',
    price: 6500,
    cpfEligible: true,
    image: '/formation-digital.jpg',
    objectives: [
      'Concevoir et developper des interfaces web responsives',
      'Maitriser JavaScript et le framework React',
      'Developper des API RESTful avec Node.js',
      'Gerer des bases de donnees SQL et NoSQL',
      'Deployer des applications web en production',
      'Travailler en equipe avec les methodes Agile/Scrum',
      'Versionner son code avec Git et GitHub',
      'Assurer la securite et les tests d\'une application web',
    ],
    prerequisites: 'Aucun prerequis technique. Une bonne maitrise de l\'outil informatique et une forte motivation sont recommandees. Un entretien telephonique de 15 minutes est organise pour valider votre admissibilite.',
    certification: 'Titre Professionnel Developpeur Web et Web Mobile — Niveau 5 (Bac+2), enregistre au RNCP par France Competences. Certification obtenue apres validation des blocs de competences en situation professionnelle.',
    rncpCode: 'RNCP 31154',
    satisfactionRate: 92,
    certificationRate: 88,
    insertionRate: 91,
    averageRating: 4.8,
    modules: [
      {
        id: 'm1',
        title: 'Fondamentaux du developpement web',
        duration: '6 semaines',
        description: '168 heures',
        topics: ['HTML5 semantique et accessibilite', 'CSS3, Flexbox, Grid et animations', 'Responsive design et mobile-first', 'Bootstrap et frameworks CSS', 'Sass et preprocesseurs CSS', 'Optimisation et performance front-end'],
      },
      {
        id: 'm2',
        title: 'JavaScript et programmation avancee',
        duration: '6 semaines',
        description: '168 heures',
        topics: ['ES6+ : syntaxe moderne et bonnes pratiques', 'Manipulation du DOM et evenements', 'Requetes API et fetch/AJAX', 'Programmation asynchrone (async/await, Promises)', 'Tests unitaires avec Jest', 'Introduction a la programmation fonctionnelle'],
      },
      {
        id: 'm3',
        title: 'Framework Front-End : React',
        duration: '5 semaines',
        description: '140 heures',
        topics: ['Composants fonctionnels et JSX', 'Hooks (useState, useEffect, useContext)', 'Gestion d\'etat avec Redux Toolkit', 'React Router et navigation', 'Styled-components et CSS-in-JS', 'Deploiement d\'applications React'],
      },
      {
        id: 'm4',
        title: 'Developpement Back-End',
        duration: '6 semaines',
        description: '168 heures',
        topics: ['Node.js et environnement serveur', 'Express.js : routage et middlewares', 'MongoDB : base de donnees NoSQL', 'PostgreSQL : base de donnees relationnelle', 'Authentification JWT et securite', 'API RESTful design patterns'],
      },
      {
        id: 'm5',
        title: 'Projet final et insertion professionnelle',
        duration: '5 semaines',
        description: '140 heures + 56h projet',
        topics: ['Conception d\'une application web complete', 'CI/CD avec GitHub Actions', 'Realisation d\'un portfolio professionnel', 'Preparation aux entretiens techniques', 'Coaching emploi et networking', 'Soutenance du projet final'],
      },
    ],
    sessions: [
      { id: 's1', startDate: '12 janv. 2026', endDate: '10 juil. 2026', location: 'Paris', spotsLeft: 4 },
      { id: 's2', startDate: '2 fevr. 2026', endDate: '31 juil. 2026', location: 'Lyon + Distanciel', spotsLeft: 8 },
      { id: 's3', startDate: '16 mars 2026', endDate: '11 sept. 2026', location: 'Paris', spotsLeft: 12 },
      { id: 's4', startDate: '6 avr. 2026', endDate: '2 oct. 2026', location: 'Marseille + Distanciel', spotsLeft: 10 },
    ],
    modalitiesPresentiel: [
      'Cours du lundi au vendredi, 9h-17h',
      'Classes de 15 apprenants maximum',
      '1 formateur pour 15 apprenants',
      'Ateliers pratiques : 70% du temps',
      'Projet fil rouge en equipe',
      'Mentorat individuel hebdomadaire',
    ],
    modalitiesDistanciel: [
      'Cours en live par visioconference',
      'Plateforme d\'apprentissage en ligne 24/7',
      'Sessions de mentoring individuel',
      'Chat de classe actif en permanence',
      'Ateliers pratiques en breakout rooms',
      'Enregistrements disponibles 6 mois',
    ],
    modalitiesAlternance: [
      '3 semaines en entreprise / 1 semaine de formation',
      'Contrat de professionnalisation',
      'Suivi pedagogique par un tuteur',
      'Missions en entreprise liees au programme',
      'Salaire selon grille conventionnelle',
      'Accompagnement a l\'embauche',
    ],
    financingOptions: ['CPF', 'OPCO', 'Pole emploi', 'Region', 'Alternance'],
    trainer: {
      name: 'Sophie Martin',
      role: 'Lead Pedagogique — Developpement Web',
      bio: '15 ans d\'experience en developpement web, ex-directrice technique chez un editeur SaaS. Specialiste React et ecosysteme JavaScript.',
      image: '/trainer-2.jpg',
    },
    relatedSlugs: ['data-analyst', 'community-manager', 'scrum-master'],
  },
  {
    ...({} as Training),
    id: '2',
    slug: 'manager-equipe',
    title: "Manager d'Equipe",
    domain: 'Management / Leadership',
    domainColor: '#7C3AED',
    description: 'Cette formation Manager d\'Equipe vous donne les cles pour accompagner vos equipes vers l\'excellence. En 4 jours intensifs, vous developpez vos competences en communication, delegation, gestion des conflits et animation de la performance individuelle et collective.',
    shortDescription: "Accompagnez vos equipes vers l'excellence. Communication, delegation, conflits, performance. 4 jours intensifs.",
    duration: '4 jours',
    durationHours: 28,
    format: 'Presentiel',
    level: 'Niveau 6 (Bac+3)',
    price: 2800,
    cpfEligible: true,
    image: '/formation-management.jpg',
    objectives: [
      'Adopter les styles de management adaptes a chaque situation',
      'Communiquer efficacement avec son equipe',
      'Deleguer et responsabiliser ses collaborateurs',
      'Gerer et prevenir les conflits en equipe',
      'Animer des reunions d\'equipe productives',
      'Fixer et suivre des objectifs de performance',
      'Developper la motivation et l\'engagement',
      'Construire un plan d\'action personnalise',
    ],
    prerequisites: 'Avoir une responsabilite d\'encadrement ou preparer une evolution vers un poste de manager. Aucun prerequis academique specifique.',
    certification: 'Certification interne Novaforma — Manager d\'Equipe. Registre de certification accessible sur demande.',
    satisfactionRate: 94,
    certificationRate: 95,
    insertionRate: 96,
    averageRating: 4.9,
    modules: [
      {
        id: 'm1',
        title: 'Les fondamentaux du management',
        duration: '1 jour',
        description: '7 heures',
        topics: ['Les 5 styles de management', 'Le management situationnel', 'Les roles et responsabilites du manager', 'La transition operationnel/management', 'Diagnostic de votre pratique managériale'],
      },
      {
        id: 'm2',
        title: 'Communication et intelligence emotionnelle',
        duration: '1 jour',
        description: '7 heures',
        topics: ['Les bases de la communication efficace', 'L\'ecoute active et la reformulation', 'L\'intelligence emotionnelle au travail', 'Communiquer en situation difficile', 'Le feedback constructif'],
      },
      {
        id: 'm3',
        title: 'Delegation et gestion des conflits',
        duration: '1 jour',
        description: '7 heures',
        topics: ['Pourquoi et comment deleguer', 'Les niveaux de delegation', 'Les types de conflits en equipe', 'Techniques de resolution de conflits', 'Mediation et negociation'],
      },
      {
        id: 'm4',
        title: 'Performance et plan d\'action',
        duration: '1 jour',
        description: '7 heures',
        topics: ['Fixer des objectifs SMART', 'Le management par les competences', 'L\'entretien professionnel', 'Le plan d\'action personnalise', 'Blended learning et suivi a 90 jours'],
      },
    ],
    sessions: [
      { id: 's1', startDate: '15 janv. 2026', endDate: '18 janv. 2026', location: 'Paris', spotsLeft: 6 },
      { id: 's2', startDate: '2 fevr. 2026', endDate: '5 fevr. 2026', location: 'Lyon', spotsLeft: 12 },
      { id: 's3', startDate: '9 mars 2026', endDate: '12 mars 2026', location: 'Paris', spotsLeft: 3 },
    ],
    modalitiesPresentiel: [
      'Formation intensive de 9h a 17h',
      'Groupes de 12 participants maximum',
      'Ateliers participatifs et role-plays',
      'Mise en situation video',
      'Restitution pedagogique',
      'Plan d\'action individuel',
    ],
    modalitiesDistanciel: [
      '4 demi-journees en visioconference',
      'Outils collaboratifs en ligne',
      'Mise en situation en sous-groupes',
      'Ressources numeriques accessibles 3 mois',
    ],
    modalitiesAlternance: [
      'Non disponible en alternance pour cette formation',
    ],
    financingOptions: ['CPF', 'OPCO', 'Pole emploi', 'Region'],
    trainer: {
      name: 'Claire Dubois',
      role: 'Experte en Leadership — Formatrice Senior',
      bio: '20 ans d\'experience en management et developpement des talents. Ancienne DRH dans un grand groupe industriel. Coach certifiee ICF.',
      image: '/trainer-1.jpg',
    },
    relatedSlugs: ['gestionnaire-paie', 'charge-recrutement', 'scrum-master'],
  },
  {
    ...({} as Training),
    id: '3',
    slug: 'anglais-professionnel-toeic',
    title: 'Anglais Professionnel — Certification TOEIC',
    domain: 'Langues / Communication',
    domainColor: '#0891B2',
    description: 'Cette formation vous permet de perfectionner votre anglais dans un contexte professionnel. Du niveau B1 a C1, vous progressez a votre rythme avec des cours du soir et le week-end. La certification TOEIC est incluse dans la formation.',
    shortDescription: 'Perfectionnez votre anglais professionnel. Cours du soir et week-end. Preparation TOEIC incluse. Niveaux B1 a C1.',
    duration: '12 semaines',
    durationHours: 72,
    format: 'Presentiel / Soir',
    level: 'Niveau 4 (Bac)',
    price: 1900,
    cpfEligible: true,
    image: '/classroom.jpg',
    objectives: [
      'Communiquer efficacement en anglais dans un contexte professionnel',
      'Comprendre et rediger des emails professionnels',
      'Participer a des reunions et presentations en anglais',
      'Preparer avec succes la certification TOEIC',
      'Enrichir son vocabulaire metier specifique',
      'Maitriser les structures grammaticales essentielles',
    ],
    prerequisites: 'Niveau B1 minimum en anglais (test de positionnement en ligne gratuit). Avoir suivi au moins 3 annees d\'anglais.',
    certification: 'Certification TOEIC Listening & Reading — Score cible 750+. Attestation de formation Novaforma.',
    satisfactionRate: 96,
    certificationRate: 92,
    insertionRate: 88,
    averageRating: 4.7,
    modules: [
      {
        id: 'm1',
        title: 'Communication orale professionnelle',
        duration: '3 semaines',
        description: '18 heures',
        topics: ['Presentation et interactions sociales', 'Telephone et visioconferences', 'Reunions et prise de parole', 'Negociation et argumentation'],
      },
      {
        id: 'm2',
        title: 'Communication ecrite professionnelle',
        duration: '3 semaines',
        description: '18 heures',
        topics: ['Redaction d\'emails professionnels', 'Rapports et notes de synthese', 'Vocabulaire metier par secteur', 'Grammaire de niveau intermediaire avance'],
      },
      {
        id: 'm3',
        title: 'Preparation TOEIC — Comprehension orale',
        duration: '3 semaines',
        description: '18 heures',
        topics: ['Strategies d\'ecoute active', 'Photographs, question-response, conversations', 'Talks et exposes', 'Simulations d\'examens TOEIC'],
      },
      {
        id: 'm4',
        title: 'Preparation TOEIC — Comprehension ecrite',
        duration: '3 semaines',
        description: '18 heures',
        topics: ['Incomplete sentences, text completion', 'Reading comprehension', 'Gestion du temps en examen', 'Examen blanc final et correction detaillee'],
      },
    ],
    sessions: [
      { id: 's1', startDate: '12 janv. 2026', endDate: '3 avr. 2026', location: 'Paris', spotsLeft: 8 },
      { id: 's2', startDate: '15 fevr. 2026', endDate: '9 mai 2026', location: 'Lyon', spotsLeft: 15 },
      { id: 's3', startDate: '16 mars 2026', endDate: '6 juin 2026', location: 'Distanciel', spotsLeft: 20 },
    ],
    modalitiesPresentiel: [
      'Cours du lundi et mercredi soir, 18h30-21h',
      'Groupes de 8 a 10 participants',
      '1 formateur natif bilingue qualifie',
      'Salle multimedia equipee',
      'Manuel et ressources numeriques inclus',
    ],
    modalitiesDistanciel: [
      'Cours en live, meme horaire que le presentiel',
      'Plateforme d\'e-learning interactive',
      'Exercices autocorrectifs en ligne',
      'Forum de discussion avec les pairs',
    ],
    modalitiesAlternance: [
      'Non disponible en alternance',
    ],
    financingOptions: ['CPF', 'OPCO', 'Pole emploi'],
    trainer: {
      name: 'Sarah Johnson',
      role: 'Formatrice — Anglais Professionnel',
      bio: 'Bilingue franco-anglaise, 12 ans d\'experience dans l\'enseignement de l\'anglais professionnel. Certifiee preparatrice TOEIC.',
      image: '/trainer-3.jpg',
    },
    relatedSlugs: ['espagnol-professionnel', 'anglais-toeic', 'community-manager'],
  },
  {
    ...({} as Training),
    id: '4',
    slug: 'data-analyst',
    title: 'Data Analyst',
    domain: 'Digital / Informatique',
    domainColor: '#2563EB',
    description: 'Cette formation Data Analyst vous prepare a collecter, traiter et analyser des donnees pour aider les entreprises a prendre des decisions eclairees. Vous maitrisez Python, SQL, Power BI et les bases du Machine Learning.',
    shortDescription: "Maitrisez l'analyse de donnees : Python, SQL, Power BI, Machine Learning. Alternance possible. 85% d'insertion professionnelle.",
    duration: '8 mois',
    durationHours: 980,
    format: 'Presentiel / Alternance',
    level: 'Niveau 6 (Bac+3)',
    price: 8200,
    cpfEligible: true,
    image: '/formation-digital.jpg',
    objectives: [
      'Collecter et nettoyer des jeux de donnees complexes',
      'Manipuler des donnees avec Python (Pandas, NumPy)',
      'Realiser des requetes SQL avancees',
      'Creer des tableaux de bord interactifs avec Power BI',
      'Appliquer des algorithmes de Machine Learning',
      'Visualiser les donnees de maniere impactante',
      'Interpreter et communiquer des resultats analytiques',
      'Respecter le RGPD dans la gestion des donnees',
    ],
    prerequisites: 'Niveau Bac+2 recommande. Aucun prerequis technique : la formation debute par un pre-bootcamp de 2 semaines pour les debutants.',
    certification: 'Titre Professionnel Data Analyst — Niveau 6 (Bac+3), enregistre au RNCP par France Competences.',
    rncpCode: 'RNCP 34944',
    satisfactionRate: 90,
    certificationRate: 85,
    insertionRate: 89,
    averageRating: 4.6,
    modules: [
      {
        id: 'm1',
        title: 'Introduction a la data et Python',
        duration: '6 semaines',
        description: '168 heures',
        topics: ['Fondamentaux de Python', 'Pandas et manipulation de donnees', 'NumPy et calcul scientifique', 'Nettoyage et preparation des donnees'],
      },
      {
        id: 'm2',
        title: 'Bases de donnees et SQL',
        duration: '4 semaines',
        description: '112 heures',
        topics: ['Modelisation de donnees (MERISE)', 'SQL avance : jointures, sous-requetes, CTE', 'Bases de donnees cloud (BigQuery)', 'ETL et pipelines de donnees'],
      },
      {
        id: 'm3',
        title: 'Visualisation et BI',
        duration: '5 semaines',
        description: '140 heures',
        topics: ['Power BI : modele de donnees et DAX', 'Tableau de bord interactif', 'Data storytelling', 'KPIs et metiers de l\'entreprise'],
      },
      {
        id: 'm4',
        title: 'Machine Learning et projet final',
        duration: '8 semaines',
        description: '224 heures + 168h projet',
        topics: ['Algorithmes de classification et regression', 'Clustering et reduction de dimensions', 'Feature engineering', 'Projet final en entreprise', 'Deploiement de modeles'],
      },
    ],
    sessions: [
      { id: 's1', startDate: '19 janv. 2026', endDate: '18 sept. 2026', location: 'Paris', spotsLeft: 6 },
      { id: 's2', startDate: '2 mars 2026', endDate: '23 oct. 2026', location: 'Lyon + Distanciel', spotsLeft: 10 },
      { id: 's3', startDate: '6 avr. 2026', endDate: '27 nov. 2026', location: 'Paris', spotsLeft: 14 },
    ],
    modalitiesPresentiel: [
      'Cours du lundi au vendredi, 9h-17h',
      'Classes de 12 apprenants maximum',
      'Acces a un cluster de calcul',
      'Projets sur donnees reelles',
      'Hackathons data mensuels',
    ],
    modalitiesDistanciel: [
      'Cours en live par visioconference',
      'Acces a un environnement cloud Jupyter',
      'Mentoring individuel hebdomadaire',
    ],
    modalitiesAlternance: [
      '3 semaines entreprise / 1 semaine formation',
      'Contrat de professionnalisation',
      'Missions data en entreprise',
      'Soutenance devant jury professionnel',
    ],
    financingOptions: ['CPF', 'OPCO', 'Pole emploi', 'Region', 'Alternance'],
    trainer: {
      name: 'Alexandre Chen',
      role: 'Senior Data Scientist — Formateur',
      bio: 'Docteur en statistiques appliquees, 10 ans d\'experience dans la data science. Ex-lead data chez un grand groupe e-commerce.',
      image: '/trainer-2.jpg',
    },
    relatedSlugs: ['developpeur-web-full-stack', 'community-manager', 'scrum-master'],
  },
  {
    ...({} as Training),
    id: '5',
    slug: 'cqp-agent-securite',
    title: 'CQP Agent de Securite',
    domain: 'Securite / Surete',
    domainColor: '#DC2626',
    description: 'Cette formation vous prepare au CQP (Certificat de Qualification Professionnelle) Agent de Securite. Vous apprenez les techniques de surveillance, la gestion des conflits, la reglementation et les premiers secours. Recrutement garanti a l\'issue de la formation.',
    shortDescription: 'Devenez agent de securite certifie. Formation reglementaire, SSIAP 1, gestion des conflits. Recrutement garanti.',
    duration: '3 mois',
    durationHours: 420,
    format: 'Presentiel',
    level: 'Niveau 3 (CAP)',
    price: 2400,
    cpfEligible: true,
    image: '/classroom.jpg',
    objectives: [
      'Surveiller et proteger les biens et les personnes',
      'Prevenir les risques et les intrusions',
      'Gerer les conflits et les situations tendues',
      'Appliquer les gestes de premiers secours',
      'Maitriser la reglementation de la securite privee',
      'Utiliser les equipements de securite electronique',
      'Rediger des rapports d\'incidents',
    ],
    prerequisites: 'Etre majeur, detenir le Brevet de Securite Routiere, etre en bonne condition physique. Casier judiciaire vierge (Bulletin n°2).',
    certification: 'CQP Agent de Prevention et de Securite — Niveau 3, delivre par le CNAPS. SSIAP 1 (Service de Securite Incendie et d\'Assistance aux Personnes).',
    satisfactionRate: 93,
    certificationRate: 90,
    insertionRate: 94,
    averageRating: 4.7,
    modules: [
      {
        id: 'm1',
        title: 'Reglementation et cadre juridique',
        duration: '2 semaines',
        description: '56 heures',
        topics: ['Loi sur les activites privees de securite', 'Powers et limites de l\'agent', 'Deontologie et ethique professionnelle', 'CNAPS et controle'],
      },
      {
        id: 'm2',
        title: 'Techniques de surveillance',
        duration: '4 semaines',
        description: '112 heures',
        topics: ['Rondes et controles d\'acces', 'Videosurveillance (CCTV)', 'Gestion des alarmes', 'Gestion des cles et badges'],
      },
      {
        id: 'm3',
        title: 'Gestion des conflits et communication',
        duration: '2 semaines',
        description: '56 heures',
        topics: ['Prevention des agressions', 'Gestion verbale des conflits', 'Techniques de desescalade', 'Communication avec les forces de l\'ordre'],
      },
      {
        id: 'm4',
        title: 'Secours et incendie (SSIAP 1)',
        duration: '4 semaines',
        description: '112 heures',
        topics: ['Gestes de premiers secours (PSC1)', 'Secourisme en equipe', 'Prevention et lutte contre l\'incendie', 'Evacuation d\'un ERP'],
      },
      {
        id: 'm5',
        title: 'Stage pratique et examen',
        duration: '1 semaine',
        description: '28 heures + 56h stage',
        topics: ['Stage en entreprise de securite', 'Mise en situation pratique', 'Preparation a l\'examen CNAPS', 'Passage du CQP'],
      },
    ],
    sessions: [
      { id: 's1', startDate: '5 janv. 2026', endDate: '27 mars 2026', location: 'Paris', spotsLeft: 2 },
      { id: 's2', startDate: '2 fevr. 2026', endDate: '24 avr. 2026', location: 'Marseille', spotsLeft: 8 },
      { id: 's3', startDate: '2 mars 2026', endDate: '22 mai 2026', location: 'Lyon', spotsLeft: 10 },
    ],
    modalitiesPresentiel: [
      'Formation du lundi au vendredi, 8h-17h',
      'Equipements professionnels fournis',
      'Manutention et techniques corporelles',
      'Preparation physique integree',
      'Stages en entreprise partenaire',
    ],
    modalitiesDistanciel: [
      'Partie theorique en ligne (30%)',
      'Partie pratique obligatoirement en presentiel',
    ],
    modalitiesAlternance: [
      'Formation en contrat de professionnalisation',
      'Periodes en entreprise de securite',
    ],
    financingOptions: ['CPF', 'Pole emploi', 'OPCO'],
    trainer: {
      name: 'Marc Lefevre',
      role: 'Responsable Pedagogique — Securite',
      bio: '20 ans d\'experience dans le secteur de la securite privee. Ex-directeur d\'agence securite. Instructeur CNAPS et formateur SSIAP.',
      image: '/trainer-2.jpg',
    },
    relatedSlugs: ['electricien-batiment', 'charge-recrutement', 'scrum-master'],
  },
  {
    ...({} as Training),
    id: '6',
    slug: 'gestionnaire-paie',
    title: 'Gestionnaire de Paie',
    domain: 'Commerce / Vente',
    domainColor: '#059669',
    description: 'Cette formation vous prepare au metier de Gestionnaire de Paie, un poste cle dans toute entreprise. Vous maitrisez le calcul des remunerations, les declarations sociales, la DSN et la gestion des absences.',
    shortDescription: 'Maitrisez la paie et les declarations sociales. DSN, gestion des absences, contrats. 95% de taux de reussite.',
    duration: '6 mois',
    durationHours: 560,
    format: 'Presentiel / Distanciel',
    level: 'Niveau 5 (Bac+2)',
    price: 3600,
    cpfEligible: true,
    image: '/formation-management.jpg',
    objectives: [
      'Calculer les remunerations et cotisations sociales',
      'Etablir les bulletins de paie',
      'Gerer la DSN (Declaration Sociale Nominative)',
      'Traiter les arrets maladie et conges payes',
      'Rediger les contrats de travail',
      'Maitriser la legislation du travail applicable',
      'Utiliser les logiciels de paie (Silae, EBP)',
      'Produire les declarations fiscales et sociales',
    ],
    prerequisites: 'Niveau Bac minimum. Des notions en comptabilite sont un plus mais ne sont pas obligatoires.',
    certification: 'Titre Professionnel Gestionnaire de Paie — Niveau 5 (Bac+2), enregistre au RNCP par France Competences.',
    rncpCode: 'RNCP 29802',
    satisfactionRate: 91,
    certificationRate: 95,
    insertionRate: 90,
    averageRating: 4.8,
    modules: [
      {
        id: 'm1',
        title: 'Fondamentaux de la paie',
        duration: '4 semaines',
        description: '112 heures',
        topics: ['Elements du salaire brut et net', 'Cotisations sociales : salariales et patronales', 'Le bulletin de paie detaille', 'Les avantages en nature'],
      },
      {
        id: 'm2',
        title: 'Contrats et legislation du travail',
        duration: '3 semaines',
        description: '84 heures',
        topics: ['Types de contrats (CDI, CDD, interim)', 'Temps de travail et heures supplementaires', 'Conges payes et RTT', 'Reglement interieur et discipline'],
      },
      {
        id: 'm3',
        title: 'DSN et declarations sociales',
        duration: '4 semaines',
        description: '112 heures',
        topics: ['La DSN mensuelle et annuelle', 'Les attestations sociales', 'Les cotisations URSSAF, retraite, prevoyance', 'Le Clearance et les attestations fiscales'],
      },
      {
        id: 'm4',
        title: 'Gestion des absences et evenements',
        duration: '3 semaines',
        description: '84 heures',
        topics: ['Arrets maladie et subrogation', 'Conges maternite/paternite', 'Accidents du travail / maladies professionnelles', 'Indemnites de licenciement et ruptures'],
      },
      {
        id: 'm5',
        title: 'Logiciels de paie et projet final',
        duration: '4 semaines',
        description: '112 heures + 56h projet',
        topics: ['Silae : logiciel de paie leader', 'EBP Paie : module pratique', 'Paie d\'un effectif complet (cas pratique)', 'Soutenance du projet final'],
      },
    ],
    sessions: [
      { id: 's1', startDate: '12 janv. 2026', endDate: '10 juil. 2026', location: 'Paris', spotsLeft: 6 },
      { id: 's2', startDate: '2 fevr. 2026', endDate: '31 juil. 2026', location: 'Lyon', spotsLeft: 10 },
      { id: 's3', startDate: '16 mars 2026', endDate: '11 sept. 2026', location: 'Distanciel', spotsLeft: 15 },
    ],
    modalitiesPresentiel: [
      'Cours du lundi au vendredi, 9h-17h',
      'Groupes de 12 participants',
      'Salle equipee de logiciels Silae et EBP',
      'Etudes de cas sur bulletins reels',
    ],
    modalitiesDistanciel: [
      'Cours en live avec partage d\'ecran',
      'Acces a Silae en version cloud',
      'Exercices pratiques en autonomie',
      'Mentoring individuel disponible',
    ],
    modalitiesAlternance: [
      'Contrat de professionnalisation possible',
      'Missions en cabinet d\'expertise comptable',
    ],
    financingOptions: ['CPF', 'OPCO', 'Pole emploi', 'Region'],
    trainer: {
      name: 'Isabelle Petit',
      role: 'Experte-Comptable — Formatrice Paie',
      bio: '25 ans d\'experience en paie et gestion sociale. Ancienne responsable paie dans un groupe de 800 salaries. Certifiee Silae et EBP.',
      image: '/trainer-1.jpg',
    },
    relatedSlugs: ['charge-recrutement', 'manager-equipe', 'developpeur-web-full-stack'],
  },
];

// Helper to get a training by slug
export function getTrainingBySlug(slug: string): TrainingDetail | undefined {
  return trainingsExtended.find((t) => t.slug === slug);
}

// Helper to get related trainings
export function getRelatedTrainings(slugs: string[]): TrainingDetail[] {
  return slugs
    .map((slug) => trainingsExtended.find((t) => t.slug === slug))
    .filter(Boolean) as TrainingDetail[];
}

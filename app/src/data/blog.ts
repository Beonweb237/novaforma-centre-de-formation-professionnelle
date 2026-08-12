export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  author?: string;
  authorRole?: string;
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
    author: 'Sophie Moreau',
    authorRole: 'Conseillere en formation',
    content: `## Pourquoi se reconvertir dans le digital en 2026 ?

Le secteur du numerique continue sa croissance fulgurante. En 2026, plus de 200 000 postes sont a pourvoir dans les metiers du digital en France. Les entreprises recherchent activement des profils qualifies, et les salaires sont attractifs des le premier emploi.

## Quels metiers viser ?

### Developpeur web et mobile
Le metier le plus demande. Les formations sont accessibles a tous les niveaux, du CAP au Bac+5. Les salaires debutent autour de 32 000 € et peuvent atteindre 60 000 € avec l'experience.

### Data analyst
Avec l'explosion des donnees, les entreprises ont besoin de professionnels capables d'analyser et d'interpreter les chiffres. Formation recommandee : 6 a 12 mois.

### UX/UI Designer
L'experience utilisateur est devenue centrale. Les designers qui comprennent a la fois l'humain et la technique sont tres recherches.

### Chef de projet digital
Un role de coordination qui demande des competences techniques et organisationnelles. Idéal pour les profils en reconversion avec de l'experience en management.

## Comment financer votre formation ?

- **CPF** : Votre Compte Personnel de Formation peut financer tout ou partie de votre formation.
- **OPCO** : Votre operateur de competences peut prendre en charge les couts si vous etes salarie.
- **Pole emploi** : Des aides specifiques existent pour les demandeurs d'emploi.
- **Financement personnel** : Des facilités de paiement sont proposées par la plupart des organismes.

## Les etapes cles de votre reconversion

1. **Bilan de competences** : Identifiez vos forces et vos aspirations.
2. **Choix de la formation** : Privilegiez les formations certifiantes reconnues par l'Etat.
3. **Financement** : Montez votre dossier de demande d'aide.
4. **Formation** : Immergez-vous dans l'apprentissage.
5. **Insertion professionnelle** : Stages, alternance, premier emploi.

> "Je n'aurais jamais cru pouvoir changer de vie a 40 ans. Aujourd'hui, je suis developpeuse web et je m'epanouis chaque jour." - Marie, 42 ans, ancienne comptable`,
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
    author: 'Marc Dubois',
    authorRole: 'Expert financement',
    content: `## Le Compte Personnel de Formation (CPF)

Le CPF est le dispositif le plus connu. Chaque annee, votre compte est credite de 500 € (800 € pour les salaries peu qualifies), dans la limite de 5 000 €.

### Comment utiliser votre CPF ?

1. Connectez-vous sur MonCompteFormation.gouv.fr
2. Consultez votre solde disponible
3. Recherchez une formation eligible
4. Inscrivez-vous directement

### Avantages du CPF
- Autonomie totale : vous choisissez votre formation
- Cumulable avec d'autres dispositifs
- Utilisable tout au long de votre carriere

## Les OPCO (Operateurs de Competences)

Les OPCO financent les formations des salaries dans le cadre du plan de developpement des competences de l'entreprise.

### Les 11 OPCO en France

Chaque secteur d'activite a son OPCO de reference. Par exemple :
- **Atlas** pour les services financiers et le conseil
- **OPCO 2i** pour l'industrie
- **Afdas** pour la culture, les medias et les loisirs

### Comment mobiliser votre OPCO ?

1. Identifiez votre OPCO de rattachement
2. Discutez avec votre employeur ou RH
3. Choisissez une formation certifiante
4. Deposez la demande de prise en charge

## Pole emploi et les AIF

Les demandeurs d'emploi beneficient de dispositifs specifiques :

- **AIF** (Aide Individuelle a la Formation) : prise en charge totale ou partielle des frais pedagogiques
- **POEI** (Preparation Operationnelle a l'Emploi) : formation avant embauche
- **AFPR** (Action de Formation Prealable au Recrutement) : pour les CDD et contrats courts

## Cumuler les financements

Bonne nouvelle : la plupart des dispositifs sont cumulables ! Voici un exemple concret :

> Marie, 35 ans, souhaite suivre une formation de 6 000 €. Elle utilise son CPF (2 500 €), obtient une AIF de Pole emploi (2 000 €) et le reste est finance par l'OPCO de son futur employeur (1 500 €). Resultat : formation 100 % financee !`,
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
    author: 'Equipe Novaforma',
    authorRole: '',
    content: `## Le declic

Apres 10 ans dans la restauration, Karim, 32 ans, ressentait le besoin de changer de vie. "Je travaillais en coupure, les week-ends, les jours feries. Je voyais mes amis dans le digital qui avaient des horaires plus stables et des evolutions de carriere interessantes."

## Le choix du developpement web

Karim a toujours ete attire par l'informatique. "J'ai commence par des tutoriels gratuits sur YouTube et OpenClassrooms. J'ai tout de suite accroche. Le code, c'est comme une recette de cuisine : il faut suivre les etapes, mais on peut aussi etre creatif."

## Le financement

Karim a utilise plusieurs dispositifs :
- **CPF** : 2 000 €
- **AIF Pole emploi** : 3 000 €
- **Reste a charge** : 1 000 € finances sur ses economies

## La formation chez Novaforma

"J'ai choisi Novaforma pour plusieurs raisons : la certification Qualiopi, les formateurs issus du metier, et surtout la possibilite de faire la formation en 6 mois intensifs."

## Le resultat

Six mois apres le debut de sa formation, Karim a trouve un poste de developpeur front-end dans une startup parisienne. Son salaire : 36 000 € par an.

> "Si j'avais un conseil a donner : lancez-vous. Le plus dur, c'est de faire le premier pas. Apres, tout s'enchaine."

## Les conseils de Karim

1. **Testez avant de vous lancer** : faites des tutoriels gratuits pour confirmer votre interet
2. **Preparez votre budget** : anticipez les 6 mois sans revenus
3. **Choisissez une formation certifiante** : le titre RNCP est un vrai atout sur le CV
4. **Reseauter des la formation** : LinkedIn est votre meilleur allie`,
  },
];

import { useState, useRef, useEffect } from 'react';
import {
  Wallet,
  Building2,
  Briefcase,
  MapPin,
  CreditCard,
  CheckCircle,
  Calculator,
  ChevronRight,
  Phone,
  ExternalLink,
  Star,
  Users,
  GraduationCap,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ─────────────────────── types ─────────────────────── */

interface SimulatorResult {
  totalCost: number;
  cpfCoverage: number;
  otherCoverage: number;
  remainingCost: number;
  monthlyRemaining: number;
  coverageBreakdown: {
    cpf: number;
    opco: number;
    region: number;
    poleEmploi: number;
  };
}

/* ─────────────────────── data ─────────────────────── */

const financingOptions = [
  {
    id: 'cpf',
    title: 'Compte Personnel de Formation (CPF)',
    description:
      "Le CPF est un compte en euros crédité par l'État selon votre activité professionnelle. Il vous permet de financer une formation certifiante de votre choix.",
    gradient: 'from-blue-500 to-blue-600',
    icon: Wallet,
    steps: [
      'Vérifiez votre solde sur moncompteformation.fr',
      'Choisissez votre formation sur notre site',
      'Nous montons votre dossier CPF',
      'Votre financement est validé en quelques jours',
    ],
    amount: "Jusqu'à 8 000 EUR selon votre parcours",
    cta: 'Consulter mon solde CPF',
    ctaLink: 'https://moncompteformation.fr',
    external: true,
  },
  {
    id: 'opco',
    title: 'OPCO — Opérateurs de Compétences',
    description:
      "Si vous êtes salarié(e), votre OPCO (Afdas, Opco EP, Atlas, etc.) peut financer tout ou partie de votre formation. Nous nous occupons de toute la démarche.",
    gradient: 'from-purple-500 to-purple-600',
    icon: Building2,
    steps: [
      "Identifiez votre OPCO (nous pouvons vous aider)",
      'Nous préparons votre dossier de demande',
      "L'OPCO étudie votre demande (3 à 15 jours)",
      "La réponse est directement envoyée à l'organisme",
    ],
    amount: "De 500 à 5 000 EUR selon l'OPCO",
    cta: 'Vérifier mon OPCO',
    ctaLink: '#simulateur',
    external: false,
  },
  {
    id: 'pole-emploi',
    title: 'Pôle emploi / France Travail',
    description:
      "Si vous êtes demandeur d'emploi, Pôle emploi peut financer votre formation dans le cadre d'un projet professionnel. Le financement couvre souvent 100% des coûts.",
    gradient: 'from-emerald-500 to-emerald-600',
    icon: Briefcase,
    steps: [
      'Prenez rendez-vous avec votre conseiller Pôle emploi',
      'Présentez votre projet de formation Novaforma',
      'Votre conseiller valide votre AIF (Aide Individuelle à la Formation)',
      "La prise en charge est directement versée à l'organisme",
    ],
    amount: '100% du coût de la formation',
    cta: 'Contacter Pôle emploi',
    ctaLink: 'https://francetravail.fr',
    external: true,
  },
  {
    id: 'region',
    title: 'Votre Région / Collectivités',
    description:
      'Les Régions et les collectivités territoriales proposent des aides au financement de la formation professionnelle, notamment pour les demandeurs emploi et les jeunes.',
    gradient: 'from-orange-400 to-orange-500',
    icon: MapPin,
    steps: [
      'Consultez les aides de votre Région sur son site',
      'Vérifiez votre éligibilité (âge, statut, formation visée)',
      'Constituez votre dossier de demande',
      "L'aide s'ajoute à vos autres financements",
    ],
    amount: 'Variable selon la Région (500 à 3 000 EUR)',
    cta: 'Voir les aides de ma Région',
    ctaLink: '#simulateur',
    external: false,
  },
];

const faqItems = [
  {
    question: "Qu'est-ce que le Compte Personnel de Formation (CPF) ?",
    answer:
      "Le CPF est un compte crédité en euros qui remplace le DIF. Chaque travailleur accumule des droits (500 EUR/an pour les actifs, 800 EUR/an sans diplôme). Ce solde peut être utilisé pour financer une formation certifiante de votre choix, sans accord de l'employeur.",
  },
  {
    question: 'Puis-je cumuler plusieurs financements ?',
    answer:
      "Oui ! C'est même recommandé. Vous pouvez combiner votre CPF avec une prise en charge OPCO, une aide Région ou Pôle emploi. Notre équipe vous aide à constituer un plan de financement maximal.",
  },
  {
    question: "Je suis demandeur d'emploi, quelles sont mes options ?",
    answer:
      "En tant que demandeur d'emploi, vous pouvez bénéficier d'une prise en charge à 100% par Pôle emploi (via une AIF), d'une aide de votre Région, et de votre solde CPF. Dans la majorité des cas, la formation est entièrement financée.",
  },
  {
    question: 'Combien de temps faut-il pour obtenir un financement ?',
    answer:
      "Le délai varie selon le financement : CPF (immédiat si via l'appli), OPCO (3 à 15 jours), Pôle emploi (1 à 3 semaines), Région (2 à 6 semaines). Nous vous recommandons de démarrer vos démarches 2 mois avant le début de la formation.",
  },
  {
    question: 'Puis-je suivre une formation si je suis en poste ?',
    answer:
      "Absolument. Vous pouvez utiliser votre CPF et solliciter votre OPCO sans accord préalable de votre employeur (sauf temps d'absence important). Les formations en distanciel ou en soirée sont idéales pour les actifs.",
  },
  {
    question: "Que se passe-t-il si mon financement n'est pas approuvé ?",
    answer:
      "Nous ne débutons jamais une formation sans confirmation de financement. Si une aide est refusée, nous explorons avec vous les alternatives possibles (autres organismes, paiement échelonné, etc.).",
  },
];

const testimonials = [
  {
    name: 'Marie Dupont',
    quote:
      "J'ai utilisé mon CPF + une prise en charge OPCO pour financer ma formation Développeur Web. Mon reste à charge : 0 EUR. Novaforma s'est occupé de tout !",
    training: 'Développeur Web Full Stack',
    rating: 5,
    image: '/testimonial-1.jpg',
  },
  {
    name: 'Thomas Martin',
    quote:
      "Demandeur d'emploi, Pôle emploi a couvert 100% de ma formation Manager d'Équipe. J'ai trouvé un emploi 2 mois après la certification.",
    training: "Manager d'Équipe",
    rating: 5,
    image: '/testimonial-2.jpg',
  },
  {
    name: 'Amina Diallo',
    quote:
      "Mon CPF + l'aide Région + l'OPCO ont couvert ma formation Data Analyst. Le conseiller Novaforma a monté tout le dossier pour moi.",
    training: 'Data Analyst',
    rating: 5,
    image: '/testimonial-3.jpg',
  },
];

const trainingOptions = [
  'Développeur Web Full Stack',
  "Manager d'Équipe",
  'Data Analyst',
  'Community Manager',
  'Formateur Professionnel',
  'Gestionnaire de Paie',
  'Assistant Ressources Humaines',
  'Commercial B2B',
  'Technicien Réseau',
  'Chef de Projet Digital',
  'Autre formation',
];

const regionOptions = [
  'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté',
  'Bretagne',
  'Centre-Val de Loire',
  'Corse',
  'Grand Est',
  'Hauts-de-France',
  'Île-de-France',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Pays de la Loire',
  "Provence-Alpes-Côte d'Azur",
  'Guadeloupe',
  'Martinique',
  'Guyane',
  'La Réunion',
  'Mayotte',
];

const situationOptions = [
  { value: 'prive', label: 'Salarié du privé', icon: Briefcase },
  { value: 'public', label: 'Salarié du public', icon: Building2 },
  { value: 'demandeur', label: "Demandeur d'emploi", icon: Users },
  { value: 'independant', label: 'Indépendant', icon: TrendingUp },
  { value: 'etudiant', label: 'Étudiant', icon: GraduationCap },
];

/* ─────────────────────── component ─────────────────────── */

export default function Financing() {
  /* Simulator state */
  const [situation, setSituation] = useState<string>('prive');
  const [salary, setSalary] = useState<string>('');
  const [cpfBalance, setCpfBalance] = useState<string>('');
  const [training, setTraining] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  /* Count-up state */
  const [counts, setCounts] = useState({ stat1: 0, stat2: 0, stat3: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);

  /* Scroll-triggered reveals */
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Stats count-up on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  function animateCount() {
    const targets = { stat1: 97, stat2: 5000, stat3: 24 };
    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts({
        stat1: Math.round(targets.stat1 * eased),
        stat2: Math.round(targets.stat2 * eased),
        stat3: Math.round(targets.stat3 * eased),
      });
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* Simulator calculation */
  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();

    const trainingPrices: Record<string, number> = {
      'Développeur Web Full Stack': 3200,
      "Manager d'Équipe": 2800,
      'Data Analyst': 3500,
      'Community Manager': 2400,
      'Formateur Professionnel': 2600,
      'Gestionnaire de Paie': 2200,
      'Assistant Ressources Humaines': 2500,
      'Commercial B2B': 2100,
      'Technicien Réseau': 3300,
      'Chef de Projet Digital': 3400,
      'Autre formation': 3000,
    };

    const totalCost = trainingPrices[training] || 3000;
    const cpf = Math.min(Number(cpfBalance) || 0, totalCost);

    let opco = 0;
    let poleEmploi = 0;
    let regionAid = 0;

    if (situation === 'prive' || situation === 'public') {
      const salaryNum = Number(salary) || 2500;
      opco = Math.min(Math.round(salaryNum * 1.5), totalCost * 0.5);
    } else if (situation === 'demandeur') {
      poleEmploi = totalCost;
    } else if (situation === 'etudiant') {
      regionAid = Math.min(1500, totalCost * 0.4);
    }

    const otherCoverage = opco + poleEmploi + regionAid;
    const totalCoverage = cpf + otherCoverage;
    const remainingCost = Math.max(0, totalCost - totalCoverage);
    const monthlyRemaining = training ? Math.round(remainingCost / 3) : remainingCost;

    setResult({
      totalCost,
      cpfCoverage: cpf,
      otherCoverage,
      remainingCost,
      monthlyRemaining,
      coverageBreakdown: { cpf, opco, region: regionAid, poleEmploi },
    });
    setShowResult(true);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div>
      {/* ─── Section 1: Hero ─── */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 pt-32 pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav
            ref={addRevealRef}
            className="reveal-on-scroll flex items-center gap-2 text-sm text-white/70 mb-8"
          >
            <a href="#/" className="hover:text-white transition-colors">
              Accueil
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Financement</span>
          </nav>

          {/* Title */}
          <h1
            ref={addRevealRef}
            className="reveal-on-scroll text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-tight tracking-tight"
          >
            Financez votre formation
          </h1>

          {/* Subtitle */}
          <p
            ref={addRevealRef}
            className="reveal-on-scroll mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed"
          >
            Plusieurs solutions s'offrent à vous pour financer votre formation professionnelle :
            CPF, OPCO, Pôle emploi, Région... Notre équipe vous accompagne gratuitement dans vos
            démarches.
          </p>

          {/* Hero Stats */}
          <div
            ref={(el) => {
              addRevealRef(el);
              (statsRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }}
            className="reveal-on-scroll flex flex-col sm:flex-row gap-8 sm:gap-12 mt-10"
          >
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white font-mono">
                {counts.stat1}%
              </div>
              <p className="text-white/70 mt-1 text-sm">
                de nos stagiaires sont 100% financés
              </p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white font-mono">
                {counts.stat2.toLocaleString()}+
              </div>
              <p className="text-white/70 mt-1 text-sm">
                démarches accompagnées chaque année
              </p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white font-mono">
                {counts.stat3}h
              </div>
              <p className="text-white/70 mt-1 text-sm">
                délai moyen d'obtention d'un accord OPCO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Financing Options Grid ─── */}
      <section className="bg-[#F5F5F0] py-20 lg:py-[120px] px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll mb-14">
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
              VOS FINANCEMENTS
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight">
              Trouvez la solution adaptée à votre situation
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {financingOptions.map((option, i) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  ref={addRevealRef}
                  className="reveal-on-scroll bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  {/* Card Header */}
                  <div
                    className={cn(
                      'bg-gradient-to-r px-6 py-4 flex items-center gap-3',
                      option.gradient
                    )}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    <h3 className="text-lg md:text-xl font-bold text-white">{option.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-stone-600 leading-relaxed">{option.description}</p>

                    {/* Steps */}
                    <div className="mt-5">
                      <h4 className="font-semibold text-stone-900 text-sm mb-3">
                        Comment ça marche ?
                      </h4>
                      <ol className="space-y-2">
                        {option.steps.map((step, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-stone-600">
                            <span
                              className={cn(
                                'flex-shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5',
                                option.id === 'cpf'
                                  ? 'bg-blue-500'
                                  : option.id === 'opco'
                                    ? 'bg-purple-500'
                                    : option.id === 'pole-emploi'
                                      ? 'bg-emerald-500'
                                      : 'bg-orange-500'
                              )}
                            >
                              {j + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Amount */}
                    <div className="mt-5 p-3 bg-stone-50 rounded-lg">
                      <span className="text-xs text-stone-500 uppercase tracking-wide font-semibold">
                        Montant moyen pris en charge
                      </span>
                      <p className="text-stone-900 font-semibold mt-0.5">{option.amount}</p>
                    </div>

                    {/* CTA */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {option.external ? (
                        <a
                          href={option.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 text-sm"
                        >
                          {option.cta}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <a
                          href={option.ctaLink}
                          className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 text-sm"
                        >
                          {option.cta}
                        </a>
                      )}
                      <a
                        href="tel:0123456789"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Contacter un conseiller
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Financing Simulator ─── */}
      <section id="simulateur" className="bg-white py-20 lg:py-[120px] px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
              SIMULATEUR
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight">
              Calculez votre reste à charge en 2 minutes
            </h2>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
              Renseignez quelques informations pour obtenir une estimation personnalisée de votre
              financement.
            </p>
          </div>

          {/* Simulator Form */}
          <form
            onSubmit={handleCalculate}
            className="bg-[#F5F5F0] rounded-2xl p-6 lg:p-8 space-y-6"
          >
            {/* Situation professionnelle */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-3">
                Votre situation professionnelle
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {situationOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSituation(opt.value)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                        situation === opt.value
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-6 h-6',
                          situation === opt.value ? 'text-blue-600' : 'text-stone-400'
                        )}
                      />
                      <span
                        className={cn(
                          'text-xs font-medium text-center leading-tight',
                          situation === opt.value ? 'text-blue-700' : 'text-stone-600'
                        )}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Salary - conditional */}
            {(situation === 'prive' || situation === 'public') && (
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Salaire brut mensuel (EUR)
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Ex: 2 500"
                  className="w-full h-14 px-4 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Ce montant nous permet d'estimer votre contribution OPCO
                </p>
              </div>
            )}

            {/* CPF balance */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Solde CPF (EUR) — optionnel
              </label>
              <input
                type="number"
                value={cpfBalance}
                onChange={(e) => setCpfBalance(e.target.value)}
                placeholder="Ex: 3 000 (laissez vide si inconnu)"
                className="w-full h-14 px-4 bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <a
                href="https://moncompteformation.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-1.5 font-medium"
              >
                Consulter mon solde CPF
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Training */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Formation choisie
              </label>
              <select
                value={training}
                onChange={(e) => setTraining(e.target.value)}
                className="w-full h-14 px-4 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
              >
                <option value="">Sélectionnez une formation</option>
                {trainingOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Votre région
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-14 px-4 bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
              >
                <option value="">Sélectionnez votre région</option>
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-full shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculer mon financement
            </button>
          </form>

          {/* Results Panel */}
          {showResult && result && (
            <div
              ref={resultRef}
              className="mt-8 bg-white rounded-2xl border border-stone-200 shadow-xl p-6 lg:p-8 animate-result-in"
            >
              <h3 className="text-xl md:text-2xl font-bold text-stone-900">
                Estimation de votre financement
              </h3>
              {training && (
                <p className="text-stone-500 mt-1">
                  Pour la formation : <span className="font-medium text-stone-700">{training}</span>
                </p>
              )}

              {/* Breakdown Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-stone-50 rounded-xl p-6 text-center">
                  <CreditCard className="w-8 h-8 text-stone-400 mx-auto" />
                  <div className="mt-3 text-2xl font-bold text-stone-900 font-mono">
                    {result.totalCost.toLocaleString()} EUR
                  </div>
                  <p className="text-sm text-stone-500 mt-1">Coût total TTC de la formation</p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="mt-3 text-2xl font-bold text-emerald-600 font-mono">
                    {(result.cpfCoverage + result.otherCoverage).toLocaleString()} EUR
                  </div>
                  <p className="text-sm text-emerald-700 mt-1">Total des prises en charge</p>
                  <div className="mt-3 space-y-1 text-xs text-emerald-600">
                    {result.coverageBreakdown.cpf > 0 && (
                      <div className="flex justify-between">
                        <span>CPF</span>
                        <span className="font-semibold">
                          {result.coverageBreakdown.cpf.toLocaleString()} EUR
                        </span>
                      </div>
                    )}
                    {result.coverageBreakdown.opco > 0 && (
                      <div className="flex justify-between">
                        <span>OPCO</span>
                        <span className="font-semibold">
                          {result.coverageBreakdown.opco.toLocaleString()} EUR
                        </span>
                      </div>
                    )}
                    {result.coverageBreakdown.poleEmploi > 0 && (
                      <div className="flex justify-between">
                        <span>Pôle emploi</span>
                        <span className="font-semibold">
                          {result.coverageBreakdown.poleEmploi.toLocaleString()} EUR
                        </span>
                      </div>
                    )}
                    {result.coverageBreakdown.region > 0 && (
                      <div className="flex justify-between">
                        <span>Région</span>
                        <span className="font-semibold">
                          {result.coverageBreakdown.region.toLocaleString()} EUR
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <Wallet className="w-8 h-8 text-orange-500 mx-auto" />
                  <div className="mt-3 text-3xl font-bold text-orange-600 font-mono">
                    {result.remainingCost.toLocaleString()} EUR
                  </div>
                  <p className="text-sm text-orange-700 mt-1">Votre reste à charge</p>
                  {result.remainingCost === 0 ? (
                    <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      100% financé !
                    </span>
                  ) : (
                    <p className="text-xs text-orange-600 mt-2">
                      Soit {result.monthlyRemaining.toLocaleString()} EUR/mois sur la durée de la
                      formation
                    </p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="h-4 bg-stone-200 rounded-full overflow-hidden flex">
                  {result.coverageBreakdown.cpf > 0 && (
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                      style={{
                        width: `${(result.coverageBreakdown.cpf / result.totalCost) * 100}%`,
                      }}
                    />
                  )}
                  {result.coverageBreakdown.opco > 0 && (
                    <div
                      className="h-full bg-purple-500 transition-all duration-1000 ease-out delay-150"
                      style={{
                        width: `${(result.coverageBreakdown.opco / result.totalCost) * 100}%`,
                      }}
                    />
                  )}
                  {result.coverageBreakdown.poleEmploi > 0 && (
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000 ease-out delay-300"
                      style={{
                        width: `${(result.coverageBreakdown.poleEmploi / result.totalCost) * 100}%`,
                      }}
                    />
                  )}
                  {result.coverageBreakdown.region > 0 && (
                    <div
                      className="h-full bg-orange-400 transition-all duration-1000 ease-out delay-450"
                      style={{
                        width: `${(result.coverageBreakdown.region / result.totalCost) * 100}%`,
                      }}
                    />
                  )}
                  {result.remainingCost > 0 && (
                    <div
                      className="h-full bg-red-300 transition-all duration-1000 ease-out delay-600"
                      style={{
                        width: `${(result.remainingCost / result.totalCost) * 100}%`,
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-stone-500">
                  {result.coverageBreakdown.cpf > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      CPF
                    </div>
                  )}
                  {result.coverageBreakdown.opco > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      OPCO
                    </div>
                  )}
                  {result.coverageBreakdown.poleEmploi > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Pôle emploi
                    </div>
                  )}
                  {result.coverageBreakdown.region > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      Région
                    </div>
                  )}
                  {result.remainingCost > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-300" />
                      Reste à charge
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Row */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-200 hover:scale-[1.02]"
                >
                  S'inscrire à cette formation
                </a>
                <a
                  href="tel:0123456789"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-stone-300 text-stone-700 font-semibold rounded-full hover:border-stone-400 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  Être conseillé(e) par téléphone
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Section 4: FAQ ─── */}
      <section className="bg-[#F5F5F0] py-20 px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
              FOIRE AUX QUESTIONS
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight">
              Vos questions sur le financement
            </h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white border border-stone-200 rounded-xl px-2 data-[state=open]:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="px-4 py-4 text-left font-semibold text-stone-900 hover:no-underline text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-stone-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Section 5: Testimonials ─── */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
              TÉMOIGNAGES
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight">
              Ils ont financé leur formation sans dépenser 1 euro
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={addRevealRef}
                className="reveal-on-scroll bg-white rounded-2xl p-6 lg:p-8 border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-stone-700 leading-relaxed italic text-[15px]">"{t.quote}"</p>

                {/* Author */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22%3E%3Crect width=%2248%22 height=%2248%22 rx=%2224%22 fill=%23e7e5e4%22/%3E%3C/svg%3E';
                      }}
                    />
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{t.name}</p>
                      <p className="text-stone-500 text-xs">{t.training}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6: CTA Banner ─── */}
      <section className="bg-white pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div
            ref={addRevealRef}
            className="reveal-on-scroll bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl py-8 px-6 lg:px-12 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Encore des questions ?
            </h3>
            <p className="mt-3 text-white/85 max-w-2xl mx-auto">
              Nos conseillers sont là pour vous aider à monter votre dossier de financement,
              gratuitement et sans engagement.
            </p>
            <a
              href="#/contact"
              className="inline-flex items-center gap-2 mt-6 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] shadow-lg"
            >
              Prendre rendez-vous avec un conseiller
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Styles ─── */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-on-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes resultIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-result-in {
          animation: resultIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

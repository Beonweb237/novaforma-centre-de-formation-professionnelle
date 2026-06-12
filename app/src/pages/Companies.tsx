import { useState, useRef, useEffect } from 'react';
import {
  Building2,
  GraduationCap,
  Zap,
  Shield,
  CreditCard,
  Users,
  BarChart3,
  Calendar,
  Phone,
  CheckCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────── data ─────────────────────── */

const services = [
  {
    id: 'intra',
    image: '/formation-management.jpg',
    icon: Building2,
    iconColor: 'bg-blue-600',
    title: 'Formation Intra-entreprise',
    description:
      'Nous organisons la formation directement dans vos locaux ou à distance, avec un programme adapté à vos enjeux métier et votre culture d\'entreprise.',
    features: [
      'Programme 100% personnalisable',
      'Formateur dédié à votre entreprise',
      'Horaires adaptés à vos contraintes',
      'Groupe de 5 à 20 participants',
      'Support pédagogique inclus',
    ],
    cta: "Demander un devis intra",
  },
  {
    id: 'alternance',
    image: '/classroom.jpg',
    icon: GraduationCap,
    iconColor: 'bg-orange-500',
    title: 'Apprentissage & Alternance',
    description:
      'Recrutez et formez vos futurs collaborateurs via l\'alternance. Nous vous accompagnons dans la mise en place du contrat et du parcours de formation.',
    features: [
      'Aides financières jusqu\'à 8 000 EUR/an',
      'Contrat pro ou apprentissage',
      'Suivi pédagogique personnalisé',
      'Insertion garantie dans votre entreprise',
      'Plus de 15 référentiels disponibles',
    ],
    cta: 'Devenir partenaire alternance',
  },
  {
    id: 'surmesure',
    image: '/formation-digital.jpg',
    icon: Zap,
    iconColor: 'bg-emerald-500',
    title: 'Parcours Sur-mesure & Blended',
    description:
      'Combinez présentiel et distanciel pour un apprentissage optimal. Nous concevons un parcours sur mesure intégré à vos outils RH et votre planning.',
    features: [
      'Mix présentiel / distanciel / e-learning',
      'Intégration avec votre LMS existant',
      'Suivi des progrès en temps réel',
      'Certification reconnue par l\'État',
      'Accompagnement projet long terme',
    ],
    cta: 'Concevoir un parcours sur mesure',
  },
];

const valueProps = [
  {
    icon: Shield,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Certifié Qualiopi',
    description:
      'Certification Qualiopi sur les 7 critères du référentiel national. Processus qualité garanti et audité chaque année.',
  },
  {
    icon: CreditCard,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Éligible OPCO & CPF',
    description:
      'Toutes nos formations sont éligibles aux financements OPCO et CPF de vos salariés. Nous montons les dossiers pour vous.',
  },
  {
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Formateurs experts métier',
    description:
      'Nos formateurs sont des experts en activité, sélectionnés pour leur pédagogie et leur expérience terrain.',
  },
  {
    icon: BarChart3,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Reporting & ROI',
    description:
      'Suivi des progrès, taux de certification, retour sur investissement : nous vous fournissons un reporting complet.',
  },
  {
    icon: Calendar,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    title: 'Flexibilité totale',
    description:
      'Présentiel, distanciel, blended, soirs, week-ends : nous nous adaptons à vos contraintes opérationnelles.',
  },
  {
    icon: Zap,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Devis sous 24h',
    description:
      'Recevez votre devis personnalisé sous 24h ouvrées. Pas de frais cachés, un tarif transparent.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Diagnostic',
    description:
      'Nous analysons vos besoins en compétences et définissons les objectifs pédagogiques avec votre équipe RH.',
  },
  {
    number: '2',
    title: 'Proposition',
    description:
      'Nous vous remettons un devis détaillé incluant le programme, les intervenants, le calendrier et les modalités.',
  },
  {
    number: '3',
    title: 'Montage financier',
    description:
      'Nous constituons les dossiers OPCO, CPF ou Région pour financer votre formation.',
  },
  {
    number: '4',
    title: 'Déploiement',
    description:
      'Nous déployons la formation dans vos locaux ou à distance, avec un formateur dédié et un suivi pédagogique.',
  },
  {
    number: '5',
    title: 'Certification',
    description:
      'Vos collaborateurs passent leur certification. Nous fournissons un reporting complet sur les résultats et le ROI.',
  },
];

const stats = [
  { value: 350, suffix: '+', label: 'Entreprises partenaires' },
  { value: 12000, suffix: '+', label: 'Collaborateurs formés' },
  { value: 94, suffix: '%', label: "Taux de satisfaction entreprise" },
  { value: 24, suffix: 'h', label: 'Délai moyen de devis' },
];

const partnerLogos = [
  'TechCorp France',
  'BuildRight SAS',
  'MediGroup',
  'Financeo',
  'RetailPro',
  'EnergiePlus',
];

const secteurOptions = ['IT', 'Commerce', 'Industrie', 'Santé', 'BTP', 'Services', 'Autre'];
const salarieOptions = ['1-10', '11-50', '51-250', '250+'];
const formationTypeOptions = [
  'Intra-entreprise',
  'Alternance',
  'Sur-mesure',
  'Blended',
];
const domaineOptions = [
  'Digital',
  'Management',
  'Langues',
  'Sécurité',
  'BTP',
  'Commerce',
  'Santé',
  'Projet',
];

/* ─────────────────────── component ─────────────────────── */

export default function Companies() {
  const [formData, setFormData] = useState({
    companyName: '',
    secteur: '',
    nbSalaries: '',
    contactName: '',
    fonction: '',
    email: '',
    phone: '',
    typeFormation: '',
    domaine: '',
    nbParticipants: '',
    message: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);
  const [statCounts, setStatCounts] = useState(stats.map(() => 0));

  /* Scroll reveal */
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

  /* Stats count-up */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          animateStats();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  function animateStats() {
    const targets = stats.map((s) => s.value);
    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStatCounts(targets.map((t) => Math.round(t * eased)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div>
      {/* ─── Section 1: Hero ─── */}
      <section
        className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden"
        style={{ backgroundColor: '#1E3A5F' }}
      >
        {/* Diagonal pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(15deg, transparent, transparent 40px, #475569 40px, #475569 41px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav
            ref={addRevealRef}
            className="reveal-on-scroll flex items-center gap-2 text-sm text-white/70 mb-8"
          >
            <a href="#/" className="hover:text-white transition-colors">
              Accueil
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Entreprises</span>
          </nav>

          {/* Eyebrow */}
          <div ref={addRevealRef} className="reveal-on-scroll mb-6">
            <span className="inline-block px-4 py-1.5 bg-blue-400/20 text-blue-100 text-xs font-semibold uppercase tracking-widest rounded-full">
              SOLUTIONS ENTREPRISES
            </span>
          </div>

          {/* Title */}
          <h1
            ref={addRevealRef}
            className="reveal-on-scroll text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-tight tracking-tight max-w-4xl"
          >
            Formez vos équipes, boostez vos performances
          </h1>

          {/* Subtitle */}
          <p
            ref={addRevealRef}
            className="reveal-on-scroll mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            Des formations sur mesure pour vos collaborateurs, dans vos locaux ou à distance.
            Qualiopi certifié, éligible OPCO et CPF des salariés. Devis sous 24h.
          </p>

          {/* CTA Row */}
          <div
            ref={addRevealRef}
            className="reveal-on-scroll flex flex-wrap gap-4 mt-10"
          >
            <a
              href="#devis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] shadow-lg"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:0123456789"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold rounded-full transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Nous appeler
            </a>
          </div>
        </div>
      </section>

      {/* ─── Section 2: B2B Services ─── */}
      <section className="bg-[#F5F5F0] py-20 lg:py-[120px] px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll text-center mb-14">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
              NOS SOLUTIONS
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight">
              Des formations adaptées à vos besoins
            </h2>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  ref={addRevealRef}
                  className="reveal-on-scroll bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  {/* Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Overlapping icon badge */}
                    <div
                      className={cn(
                        'absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md',
                        service.iconColor
                      )}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 pt-10">
                    <h3 className="text-xl font-bold text-stone-900 text-center">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-stone-600 text-sm leading-relaxed text-center">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-5 space-y-2.5">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-stone-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-6 text-center">
                      <a
                        href="#devis"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Why Choose Novaforma ─── */}
      <section className="bg-white py-20 lg:py-[120px] px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll mb-14">
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
              POURQUOI NOUS CHOISIR
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight max-w-3xl">
              Un partenaire formation de confiance pour votre entreprise
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Arguments */}
            <div className="space-y-8">
              {valueProps.map((prop, i) => {
                const Icon = prop.icon;
                return (
                  <div
                    key={i}
                    ref={addRevealRef}
                    className="reveal-on-scroll flex items-start gap-4"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div
                      className={cn(
                        'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                        prop.iconBg
                      )}
                    >
                      <Icon className={cn('w-6 h-6', prop.iconColor)} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-stone-900">{prop.title}</h4>
                      <p className="mt-1 text-stone-600 text-sm leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Image */}
            <div ref={addRevealRef} className="reveal-on-scroll lg:sticky lg:top-32">
              <img
                src="/campus.jpg"
                alt="Campus Novaforma"
                className="w-full rounded-2xl shadow-xl object-cover max-h-[500px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Process Timeline ─── */}
      <section className="bg-[#F5F5F0] py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll text-center mb-14">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
              NOTRE PROCESSUS
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight">
              De votre demande à la certification en 5 étapes
            </h2>
          </div>

          {/* Timeline - Desktop horizontal, Mobile vertical */}
          <div className="relative">
            {/* Connecting line - desktop */}
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-blue-300" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  ref={addRevealRef}
                  className="reveal-on-scroll flex md:flex-col items-start md:items-center gap-4 md:text-center"
                  style={{ transitionDelay: `${i * 0.2}s` }}
                >
                  {/* Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md z-10">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900">{step.title}</h4>
                    <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Stats / Social Proof ─── */}
      <section
        className="py-20 px-6 lg:px-20"
        style={{ backgroundColor: '#1E3A5F' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Stats Row */}
          <div
            ref={(el) => {
              addRevealRef(el);
              (statsRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }}
            className="reveal-on-scroll grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl lg:text-5xl font-bold text-white font-mono">
                  {statCounts[i].toLocaleString()}
                  {stat.suffix}
                </div>
                <p className="mt-2 text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Partner Logos */}
          <div ref={addRevealRef} className="reveal-on-scroll mt-16">
            <p className="text-center text-white/60 text-sm mb-8">Ils nous font confiance</p>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              {partnerLogos.map((logo, i) => (
                <div
                  key={i}
                  className="px-6 py-3 bg-white/5 rounded-lg text-white/40 font-semibold text-sm hover:text-white/80 hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 6: Quote Form ─── */}
      <section id="devis" className="bg-white py-20 lg:py-[120px] px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div ref={addRevealRef} className="reveal-on-scroll text-center mb-12">
            <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
              DEMANDER UN DEVIS
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-[44px] font-bold text-stone-900 leading-tight">
              Obtenez votre devis personnalisé sous 24h
            </h2>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
              Remplissez ce formulaire et notre équipe commerciale vous contactera rapidement pour
              étudier votre projet.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#F5F5F0] rounded-2xl p-6 lg:p-8 space-y-6"
          >
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Nom de l'entreprise <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Ex: Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Secteur d'activité
                </label>
                <select
                  name="secteur"
                  value={formData.secteur}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  {secteurOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Nombre de salariés
                </label>
                <select
                  name="nbSalaries"
                  value={formData.nbSalaries}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  {salarieOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Votre nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Prénom Nom"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Votre fonction
                </label>
                <input
                  type="text"
                  name="fonction"
                  value={formData.fonction}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="RH / Direction / Manager / Autre"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Email professionnel <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="email@entreprise.fr"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Type de formation
                </label>
                <select
                  name="typeFormation"
                  value={formData.typeFormation}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  {formationTypeOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Domaine
                </label>
                <select
                  name="domaine"
                  value={formData.domaine}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                >
                  <option value="">Sélectionnez</option>
                  {domaineOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Nombre de participants
                </label>
                <input
                  type="number"
                  name="nbParticipants"
                  value={formData.nbParticipants}
                  onChange={handleFormChange}
                  className="w-full h-12 px-4 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Ex: 12"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Message / Besoins
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Décrivez votre projet de formation, vos objectifs, vos contraintes..."
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleFormChange}
                required
                className="mt-1 w-4 h-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-stone-600 leading-relaxed">
                J'accepte que Novaforma me contacte au sujet de ma demande de devis
                <span className="text-red-500"> *</span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-full transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg"
            >
              Demander mon devis
            </button>

            <p className="text-center text-sm text-stone-500">
              Devis gratuit et sans engagement. Traitement sous 24h ouvrées.
            </p>

            {/* Success message */}
            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center animate-result-in">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-emerald-800">
                  Votre demande a bien été envoyée !
                </p>
                <p className="text-sm text-emerald-600 mt-1">
                  Notre équipe commerciale vous contactera sous 24h.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ─── Section 7: CTA Banner ─── */}
      <section className="bg-white pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div
            ref={addRevealRef}
            className="reveal-on-scroll bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl py-8 px-6 lg:px-12 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Vous préférez discuter de votre projet en direct ?
            </h3>
            <p className="mt-3 text-white/85 max-w-2xl mx-auto">
              Notre équipe commerciale est disponible du lundi au vendredi, 9h–18h.
            </p>
            <a
              href="tel:0123456789"
              className="inline-flex items-center gap-2 mt-6 px-8 py-4 bg-white hover:bg-stone-100 text-blue-700 font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] shadow-lg"
            >
              <Phone className="w-5 h-5" />
              01 23 45 67 89
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

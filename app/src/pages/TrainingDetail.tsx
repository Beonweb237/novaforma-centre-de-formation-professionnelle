import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clock, Users, BarChart, GraduationCap, CheckCircle, ChevronRight,
  ChevronDown, Phone, Award,
  Calculator
} from 'lucide-react';
import { getTrainingBySlug } from '../data/trainings-extended';
import { trainings } from '../data/trainings';
import TrainingCard from '../components/TrainingCard';

gsap.registerPlugin(ScrollTrigger);

function formatPrice(n: number): string {
  return n.toLocaleString('fr-FR') + ' EUR';
}

/* ─── Spot Color Helper ─── */
function getSpotColor(spots: number): string {
  if (spots <= 2) return 'text-red-600';
  if (spots <= 5) return 'text-orange-500';
  return 'text-emerald-600';
}

/* ═══════════════════════════════════════════
   TRAINING DETAIL PAGE
   ═══════════════════════════════════════════ */
export default function TrainingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const training = slug ? getTrainingBySlug(slug) : undefined;

  const [activeAccordion, setActiveAccordion] = useState<string | null>('m1');
  const [activeModalTab, setActiveModalTab] = useState<'Presentiel' | 'Distanciel' | 'Alternance'>('Presentiel');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [salary, setSalary] = useState('');
  const [cpfBalance, setCpfBalance] = useState('');
  const [situation, setSituation] = useState<'Salarie' | 'Demandeur' | 'Independant'>('Salarie');

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ─── Scroll listener for sticky bar ─── */
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─── GSAP Animations ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.td-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 });
      gsap.fromTo('.td-hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.2 });
      gsap.fromTo('.td-hero-meta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.td-hero-cpf', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.4 });

      gsap.fromTo('.td-fade-up', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
      });

      gsap.fromTo('.td-sidebar', { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: 0.4 });
    }, heroRef);
    return () => ctx.revert();
  }, [slug]);

  /* ─── Redirect if not found ─── */
  if (!training) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-4">Formation introuvable</h1>
        <p className="text-stone-600 text-center max-w-md mb-6">
          La formation que vous recherchez n&apos;existe pas ou a ete deplacee.
        </p>
        <a
          href="#/catalogue"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
        >
          Voir le catalogue
        </a>
      </div>
    );
  }

  const allTrainingsForRelated = trainings.filter((t) =>
    training.relatedSlugs.includes(t.slug) && t.slug !== training.slug
  );

  /* ─── Financing Simulator Calc ─── */
  const salaryNum = parseInt(salary) || 0;
  const cpfNum = parseInt(cpfBalance) || 0;
  let employerContribution = 0;
  let stateContribution = 0;
  if (situation === 'Salarie') {
    employerContribution = Math.min(training.price * 0.4, 2000);
    stateContribution = Math.min(training.price * 0.1, 800);
  } else if (situation === 'Demandeur') {
    stateContribution = Math.min(training.price * 0.7, 5000);
  } else {
    employerContribution = Math.min(training.price * 0.3, 1500);
  }
  const totalSupport = Math.min(cpfNum + employerContribution + stateContribution, training.price);
  const remainderCharge = Math.max(0, training.price - totalSupport);
  const monthlyCharge = training.duration.includes('mois')
    ? remainderCharge / parseInt(training.duration)
    : remainderCharge;

  const modalityMap: Record<string, string[]> = {
    'Presentiel': training.modalitiesPresentiel,
    'Distanciel': training.modalitiesDistanciel,
    'Alternance': training.modalitiesAlternance,
  };

  return (
    <div ref={heroRef}>
      {/* ═══ SECTION 1: Hero ═══ */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={training.image}
          alt={training.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(30,58,95,0.85) 0%, rgba(30,58,95,0.5) 50%, rgba(30,58,95,0.2) 100%)' }}
        />
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 lg:px-20 pt-32 pb-8 flex flex-col justify-end">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <a href="#/" className="hover:text-white transition-colors">Accueil</a>
            <ChevronRight className="w-4 h-4" />
            <a href="#/catalogue" className="hover:text-white transition-colors">Catalogue</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90">{training.domain}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{training.title}</span>
          </nav>

          {/* Domain Badge */}
          <div className="td-hero-badge inline-flex mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
              style={{ backgroundColor: training.domainColor + '25', color: training.domainColor }}
            >
              {training.domain}
            </span>
          </div>

          {/* Title */}
          <h1 className="td-hero-title text-3xl md:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
            {training.title}
          </h1>

          {/* Quick Meta Row */}
          <div className="td-hero-meta flex flex-wrap gap-4 md:gap-6 mb-4">
            <span className="flex items-center gap-1.5 text-sm text-white/85">
              <Clock className="w-4 h-4" />
              {training.duration}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/85">
              <Users className="w-4 h-4" />
              {training.format}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/85">
              <BarChart className="w-4 h-4" />
              {training.level}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/85">
              <GraduationCap className="w-4 h-4" />
              Titre RNCP
            </span>
          </div>

          {/* CPF Badge */}
          {training.cpfEligible && (
            <div className="td-hero-cpf inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold w-fit">
              <CheckCircle className="w-4 h-4" />
              Eligible CPF
            </div>
          )}
        </div>
      </section>

      {/* ═══ SECTION 2: Sticky Info Bar ═══ */}
      <div
        className={
          'sticky top-[72px] z-30 bg-white border-b border-stone-200 transition-all duration-300 ' +
          (showStickyBar ? 'opacity-100 translate-y-0 shadow-sm' : 'opacity-0 -translate-y-2 pointer-events-none')
        }
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-20 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-bold text-stone-900 truncate text-sm md:text-base">{training.title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" />
              {training.duration}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
              {training.level}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="#/contact"
              className="hidden sm:inline-flex px-4 py-2 border-[1.5px] border-blue-600 text-blue-600 font-semibold text-sm rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              Demander un devis
            </a>
            <a
              href="#/contact"
              className="px-5 py-2 bg-orange-500 text-white font-semibold text-sm rounded-full hover:bg-orange-600 transition-colors"
            >
              S&apos;inscrire
            </a>
          </div>
        </div>
      </div>

      {/* ═══ SECTION 3: Two-Column Content ═══ */}
      <section className="py-12" style={{ backgroundColor: '#F5F5F0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* ─── Left Column (~65%) ─── */}
            <div className="flex-1 min-w-0" ref={contentRef}>
              {/* Description */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">
                  Description de la formation
                </h2>
                <p className="text-base text-stone-600 leading-[1.7]">
                  {training.description}
                </p>
              </div>

              {/* Objectives */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-5">
                  Objectifs pedagogiques
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {training.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-stone-700 leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Accordion */}
              <div className="td-fade-up mb-10">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-stone-900">Programme detaille</h2>
                  <span className="text-sm text-stone-500">
                    {training.duration} — {training.durationHours} heures
                  </span>
                </div>
                <div className="space-y-2">
                  {training.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="bg-white rounded-xl border border-stone-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveAccordion(activeAccordion === mod.id ? null : mod.id)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-semibold text-stone-900 text-sm md:text-base">
                              {mod.title}
                            </span>
                            <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                              {mod.duration}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400 mt-0.5">{mod.description}</p>
                        </div>
                        <ChevronDown
                          className={
                            'w-5 h-5 text-stone-400 flex-shrink-0 ml-3 transition-transform duration-300 ' +
                            (activeAccordion === mod.id ? 'rotate-180' : '')
                          }
                        />
                      </button>
                      <div
                        className={
                          'overflow-hidden transition-all duration-300 ' +
                          (activeAccordion === mod.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0')
                        }
                      >
                        <div className="px-5 pb-4 border-t border-stone-100 pt-3">
                          <ul className="space-y-1.5">
                            {mod.topics.map((topic, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result Indicators */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-5">Indicateurs de resultats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: `${training.satisfactionRate}%`, label: 'Taux de satisfaction' },
                    { value: `${training.certificationRate}%`, label: 'Taux de certification' },
                    { value: `${training.insertionRate}%`, label: "Taux d'insertion a 6 mois" },
                    { value: `${training.averageRating}/5`, label: 'Note moyenne des apprenants' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl border border-stone-200 p-5 text-center">
                      <p className="font-mono text-2xl font-bold text-blue-600">{stat.value}</p>
                      <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-3">
                  Resultats 2024-2025 — Source : enquetes internes Novaforma
                </p>
              </div>

              {/* Prerequisites */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Prerequis</h2>
                <p className="text-base text-stone-600 leading-relaxed">
                  {training.prerequisites}
                </p>
              </div>

              {/* Certification */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">Certification</h2>
                <p className="text-base text-stone-600 leading-relaxed mb-3">
                  {training.certification}
                </p>
                {training.rncpCode && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    <Award className="w-4 h-4" />
                    {training.rncpCode} — France Competences
                  </span>
                )}
              </div>

              {/* Modalities */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-5">Modalites pedagogiques</h2>
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  {/* Tabs */}
                  <div className="flex border-b border-stone-200">
                    {(['Presentiel', 'Distanciel', 'Alternance'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveModalTab(tab)}
                        className={
                          'flex-1 py-3 text-sm font-semibold transition-colors ' +
                          (activeModalTab === tab
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                            : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50')
                        }
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {/* Tab Content */}
                  <div className="p-5">
                    <ul className="space-y-2.5">
                      {modalityMap[activeModalTab]?.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                          <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sessions Calendar */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-5">Prochaines sessions</h2>
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200">
                        <th className="text-left text-xs font-semibold text-stone-700 px-4 py-3 uppercase tracking-wide">Session</th>
                        <th className="text-left text-xs font-semibold text-stone-700 px-4 py-3 uppercase tracking-wide">Debut</th>
                        <th className="text-left text-xs font-semibold text-stone-700 px-4 py-3 uppercase tracking-wide">Fin</th>
                        <th className="text-left text-xs font-semibold text-stone-700 px-4 py-3 uppercase tracking-wide">Lieu</th>
                        <th className="text-left text-xs font-semibold text-stone-700 px-4 py-3 uppercase tracking-wide">Places</th>
                        <th className="text-left text-xs font-semibold text-stone-700 px-4 py-3 uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {training.sessions.map((sess, i) => (
                        <tr
                          key={sess.id}
                          className={i < training.sessions.length - 1 ? 'border-b border-stone-100 hover:bg-stone-50 transition-colors' : 'hover:bg-stone-50 transition-colors'}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-stone-900">Session {i + 1}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{sess.startDate}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{sess.endDate}</td>
                          <td className="px-4 py-3 text-sm text-stone-600">{sess.location}</td>
                          <td className={`px-4 py-3 text-sm font-semibold ${getSpotColor(sess.spotsLeft)}`}>
                            {sess.spotsLeft} place{sess.spotsLeft > 1 ? 's' : ''}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href="#/contact"
                              className="inline-flex px-3 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-full hover:bg-orange-600 transition-colors"
                            >
                              S&apos;inscrire
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trainer */}
              <div className="td-fade-up mb-10">
                <h2 className="text-2xl font-bold text-stone-900 mb-5">Votre formateur</h2>
                <div className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col sm:flex-row items-start gap-5">
                  <img
                    src={training.trainer.image}
                    alt={training.trainer.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-stone-900 text-lg">{training.trainer.name}</p>
                    <p className="text-sm text-blue-600 font-medium mb-2">{training.trainer.role}</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{training.trainer.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right Column (Sticky Sidebar) ─── */}
            <div className="w-full lg:w-[360px] flex-shrink-0">
              <div className="lg:sticky lg:top-36 space-y-6 td-sidebar">
                {/* Enrollment Card */}
                <div className="bg-white rounded-2xl border border-stone-200 shadow-lg p-6">
                  <p className="font-mono text-3xl font-bold text-stone-900">
                    {formatPrice(training.price)}
                  </p>
                  <p className="text-sm text-stone-500 mb-4">Prix total de la formation</p>

                  <div className="border-t border-stone-200 pt-4 space-y-2.5 mb-4">
                    {training.cpfEligible && (
                      <span className="flex items-center gap-2 text-sm text-emerald-700">
                        <CheckCircle className="w-4 h-4" /> Eligible CPF
                      </span>
                    )}
                    {training.financingOptions.includes('OPCO') && (
                      <span className="flex items-center gap-2 text-sm text-blue-700">
                        <CheckCircle className="w-4 h-4" /> OPCO
                      </span>
                    )}
                    {training.financingOptions.includes('Pole emploi') && (
                      <span className="flex items-center gap-2 text-sm text-blue-700">
                        <CheckCircle className="w-4 h-4" /> Pole emploi
                      </span>
                    )}
                    {training.financingOptions.includes('Region') && (
                      <span className="flex items-center gap-2 text-sm text-blue-700">
                        <CheckCircle className="w-4 h-4" /> Region
                      </span>
                    )}
                    {training.financingOptions.includes('Alternance') && (
                      <span className="flex items-center gap-2 text-sm text-blue-700">
                        <CheckCircle className="w-4 h-4" /> Alternance possible
                      </span>
                    )}
                  </div>

                  <a href="#/financement" className="block text-sm text-blue-600 hover:underline mb-4">
                    Verifiez votre solde CPF
                  </a>

                  <div className="border-t border-stone-200 pt-4 space-y-3">
                    <a
                      href="#/contact"
                      className="block w-full text-center px-6 py-4 bg-orange-500 text-white font-bold text-base rounded-full hover:bg-orange-600 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      S&apos;inscrire a cette formation
                    </a>
                    <a
                      href="#/contact"
                      className="block w-full text-center px-6 py-3 border-[1.5px] border-blue-600 text-blue-600 font-semibold text-sm rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      Demander un devis
                    </a>
                    <a
                      href="tel:0123456789"
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-full transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Etre rappele(e)
                    </a>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: '#1E3A5F' }}>
                  <h3 className="text-lg font-bold mb-2">Besoin d&apos;aide pour choisir ?</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Nos conseillers sont disponibles du lundi au vendredi, 9h-18h.
                  </p>
                  <a href="tel:0123456789" className="flex items-center gap-2 text-xl font-bold hover:text-orange-300 transition-colors">
                    <Phone className="w-5 h-5" />
                    01 23 45 67 89
                  </a>
                  <p className="text-xs text-white/60 mt-1">Appel gratuit</p>
                </div>

                {/* Similar Trainings */}
                {allTrainingsForRelated.length > 0 && (
                  <div className="bg-white rounded-2xl border border-stone-200 p-6">
                    <h3 className="text-base font-bold text-stone-900 mb-4">Formations similaires</h3>
                    <div className="space-y-4">
                      {allTrainingsForRelated.slice(0, 3).map((rt) => (
                        <a
                          key={rt.id}
                          href={`#/formation/${rt.slug}`}
                          className="flex items-start gap-3 group"
                        >
                          <img
                            src={rt.image}
                            alt={rt.title}
                            className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-stone-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {rt.title}
                            </p>
                            <p className="text-sm font-semibold text-orange-500">
                              {formatPrice(rt.price)}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: Financing Simulator ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setSimulatorOpen(!simulatorOpen)}
              className="w-full flex items-center justify-between p-6 bg-stone-50 rounded-2xl border border-stone-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-stone-900">Simulez votre reste a charge</h3>
                  <p className="text-sm text-stone-500">Calculez en 2 minutes votre financement personnalise</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${simulatorOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${simulatorOpen ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
            >
              <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6">
                {/* Salary */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Salaire brut mensuel (EUR)
                  </label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Ex: 2500"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* CPF Balance */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Solde CPF (EUR) — optionnel
                  </label>
                  <input
                    type="number"
                    value={cpfBalance}
                    onChange={(e) => setCpfBalance(e.target.value)}
                    placeholder="Ex: 3000"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Situation */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Situation</label>
                  <div className="flex flex-wrap gap-2">
                    {(['Salarie', 'Demandeur', 'Independant'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSituation(s)}
                        className={
                          'px-4 py-2 rounded-full text-sm font-semibold transition-colors ' +
                          (situation === s
                            ? 'bg-blue-600 text-white'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200')
                        }
                      >
                        {s === 'Salarie' ? 'Salarie' : s === 'Demandeur' ? "Demandeur d'emploi" : 'Independant'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results */}
                {salaryNum > 0 && (
                  <div className="bg-stone-50 rounded-xl p-5 space-y-3 border border-stone-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">Cout de la formation</span>
                      <span className="font-mono text-lg font-bold text-stone-900">{formatPrice(training.price)}</span>
                    </div>
                    {cpfNum > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-600">Prise en charge CPF</span>
                        <span className="font-mono text-base font-semibold text-emerald-600">-{formatPrice(cpfNum)}</span>
                      </div>
                    )}
                    {employerContribution > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-600">Prise en charge employeur/OPCO</span>
                        <span className="font-mono text-base font-semibold text-blue-600">-{formatPrice(employerContribution)}</span>
                      </div>
                    )}
                    {stateContribution > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-600">Prise en charge Pole emploi/Region</span>
                        <span className="font-mono text-base font-semibold text-blue-600">-{formatPrice(stateContribution)}</span>
                      </div>
                    )}
                    <div className="border-t border-stone-200 pt-3 flex justify-between items-center">
                      <span className="text-sm font-semibold text-stone-900">Reste a charge</span>
                      <span className="font-mono text-2xl font-bold text-orange-500">{formatPrice(remainderCharge)}</span>
                    </div>
                    {training.duration.includes('mois') && remainderCharge > 0 && (
                      <p className="text-xs text-stone-500 text-right">
                        Soit environ {Math.round(monthlyCharge).toLocaleString('fr-FR')} EUR/mois sur {training.duration}
                      </p>
                    )}
                  </div>
                )}

                <a
                  href="#/contact"
                  className="block w-full text-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
                >
                  Financer ma formation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: Related Trainings ═══ */}
      {allTrainingsForRelated.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#F5F5F0' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">
              Autres formations qui pourraient vous interesser
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allTrainingsForRelated.map((rt, i) => (
                <TrainingCard key={rt.id} training={rt} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SECTION 6: CPF Banner ═══ */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-lg">
                Cette formation est eligible au Compte Personnel de Formation.
              </p>
              <p className="text-white/80 text-sm mt-1">
                Verifiez votre solde et simulez votre reste a charge.
              </p>
            </div>
            <a
              href="#/financement"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-stone-100 transition-colors shadow-lg whitespace-nowrap"
            >
              Simuler mon financement
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

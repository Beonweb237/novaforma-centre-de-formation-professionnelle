import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle, GraduationCap, Shield, Users, Star, Phone, ChevronLeft, ChevronRight,
  Clock, BookOpen, Briefcase, ArrowRight, Calculator, Monitor, BarChart3, Globe,
  Heart, ShoppingCart, FolderKanban, HardHat
} from 'lucide-react';
import { trainings } from '../data/trainings';
import { testimonials } from '../data/testimonials';
import { blogPosts } from '../data/blog';
import { stats } from '../data/stats';

gsap.registerPlugin(ScrollTrigger);

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ElementType> = {
  Monitor, Users, Globe, Shield, HardHat, ShoppingCart, Heart, FolderKanban,
  Star, BookOpen, Briefcase, CheckCircle, GraduationCap, BarChart3,
};

/* ─── Format Price ─── */
function formatPrice(n: number): string {
  return n.toLocaleString('fr-FR') + ' EUR';
}

/* ═══════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-bg', { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 })
        .fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2)
        .fromTo('.hero-h1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3)
        .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.6)
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.9)
        .fromTo('.hero-trust', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 1.1);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="hero-bg absolute inset-0">
        <img
          src="/hero-main.jpg"
          alt="Formation professionnelle"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(30,58,95,0.85) 0%, rgba(30,58,95,0.7) 50%, rgba(30,58,95,0.2) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-20 py-20">
        <div className="max-w-[680px]">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-white text-sm font-medium">
              Centre de Formation Professionnelle — Certifie Qualiopi
            </span>
          </div>

          {/* H1 */}
          <h1 className="hero-h1 text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Transformez votre avenir
            <br />
            <span className="text-orange-400">avec une formation certifiante</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub text-lg md:text-xl text-white/90 leading-relaxed max-w-[560px] mb-8">
            Plus de 120 formations professionnelles eligible CPF. Qualiopi certifie, reconnu par l'Etat.
            Prochains departs : janvier, fevrier et mars 2026.
          </p>

          {/* CTA Row */}
          <div className="hero-cta flex flex-wrap gap-4 mb-12">
            <a
              href="#/financement"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Consulter mon CPF
            </a>
            <a
              href="#/catalogue"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full border-[1.5px] border-white/40 transition-all duration-200"
            >
              Voir les formations
            </a>
            <a
              href="#/contact"
              className="px-4 py-4 text-white font-medium underline underline-offset-4 hover:text-orange-300 transition-colors"
            >
              Demander un devis
            </a>
          </div>

          {/* Trust Bar */}
          <div className="hero-trust inline-flex flex-wrap items-center gap-4 md:gap-8 bg-white/90 backdrop-blur-sm rounded-xl py-3 px-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-stone-700 text-sm font-medium">Certifie Qualiopi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-stone-700 text-sm font-medium">Eligible CPF</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-navy" />
              </div>
              <span className="text-stone-700 text-sm font-medium">Organisme certifie</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-stone-600" />
              </div>
              <span className="text-stone-700 text-sm font-medium">5000+ stagiaires</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2: TRAINING DOMAINS
   ═══════════════════════════════════════════ */
function DomainsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const domainData = [
    { icon: 'Monitor', title: 'Digital & Informatique', desc: 'Developpement web, cyber securite, data, cloud, IA. Des formations a la pointe de la tech.', color: '#2563EB' },
    { icon: 'Users', title: 'Management & Leadership', desc: 'Managez des equipes, pilotez des projets, devenez leader. De la certification au MBA.', color: '#7C3AED' },
    { icon: 'Globe', title: 'Langues & Communication', desc: 'Anglais, espagnol, FLE. Certification TOEIC, Cambridge, niveaux A1 a C2.', color: '#0891B2' },
    { icon: 'Shield', title: 'Securite & Surete', desc: 'CQP, SSIAP, CSE, sauveteur secouriste. Formations reglementaires et certifiantes.', color: '#DC2626' },
    { icon: 'HardHat', title: 'BTP & Construction', desc: "Gros oeuvre, electricite, plomberie, permis de construire. CAP a Bac Pro.", color: '#B45309' },
    { icon: 'ShoppingCart', title: 'Commerce & Vente', desc: 'Techniques de vente, merchandising, e-commerce, relation client.', color: '#059669' },
    { icon: 'Heart', title: 'Sante & Social', desc: 'Aide-soignant, auxiliaire de puericulture, accompagnement personnes agees.', color: '#EC4899' },
    { icon: 'FolderKanban', title: 'Gestion de Projet', desc: 'PRINCE2, Agile/Scrum, PMP, gestion d\'equipe. Certification internationale.', color: '#F97316' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.domain-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.fromTo('.domain-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.08,
        scrollTrigger: { trigger: '.domain-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-[120px]" style={{ backgroundColor: '#F5F5F0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="domain-header text-blue-600 text-xs font-semibold uppercase tracking-[0.1em] mb-3">
            NOS DOMAINES DE FORMATION
          </p>
          <h2 className="domain-header text-2xl md:text-4xl xl:text-[44px] font-bold text-stone-900 leading-tight mb-4">
            Quel que soit votre projet, nous avons la formation qu'il vous faut
          </h2>
          <p className="domain-header text-lg text-stone-600 max-w-2xl mx-auto">
            8 domaines d'excellence, plus de 120 formations certifiantes du CAP au Bac+5
          </p>
        </div>

        {/* Grid */}
        <div className="domain-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domainData.map((d) => {
            const IconComp = iconMap[d.icon];
            return (
              <a
                key={d.title}
                href="#/catalogue"
                className="domain-card group bg-white rounded-xl p-6 border border-stone-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: d.color + '15' }}
                >
                  {IconComp && <IconComp className="w-6 h-6" style={{ color: d.color }} />}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{d.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-3">{d.desc}</p>
                <span className="text-sm font-semibold text-blue-600 inline-flex items-center gap-1">
                  Explorer <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3: FEATURED TRAININGS
   ═══════════════════════════════════════════ */
function FeaturedTrainingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 380;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.featured-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.fromTo('.training-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.training-scroll', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-[120px] bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="featured-header flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.1em] mb-3">
              FORMATIONS A LA UNE
            </p>
            <h2 className="text-2xl md:text-4xl xl:text-[44px] font-bold text-stone-900 leading-tight">
              Nos formations les plus demandees
            </h2>
          </div>
          <a href="#/catalogue" className="hidden md:inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors mt-4 md:mt-0">
            Voir toutes les formations <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="training-scroll flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trainings.map((t) => (
              <div
                key={t.id}
                className="training-card flex-shrink-0 w-[340px] snap-start bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: t.domainColor }}
                  >
                    {t.domain}
                  </div>
                </div>
                {/* Body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2">{t.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-3 mb-4">{t.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-stone-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{t.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{t.format}</span>
                    <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" />{t.level}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-jetbrains text-xl font-bold text-stone-900">{formatPrice(t.price)} <span className="text-xs font-normal text-stone-500">TTC</span></span>
                    {t.cpfEligible && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Eligible CPF</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={`#/formation/${t.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      En savoir plus
                    </a>
                    <a href={`#/formation/${t.slug}`} className="ml-auto px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors">
                      S'inscrire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white rounded-full shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors z-10 hidden lg:flex"
            aria-label="Precedent"
          >
            <ChevronLeft className="w-5 h-5 text-stone-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white rounded-full shadow-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors z-10 hidden lg:flex"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        <div className="mt-6 text-center md:hidden">
          <a href="#/catalogue" className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Voir toutes les formations <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4: STATS
   ═══════════════════════════════════════════ */
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          stats.forEach((stat, i) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 2,
              ease: 'power2.out',
              delay: i * 0.2,
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
        },
      });
      gsap.fromTo('.stat-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.fromTo('.stat-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.2,
        scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="stat-header text-center mb-12">
          <h2 className="text-2xl md:text-4xl xl:text-[44px] font-bold text-white mb-4">
            Des resultats qui parlent
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Chaque annee, nous formons des milliers de professionnels qui reussissent leur reconversion ou leur montee en competences.
          </p>
        </div>

        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const IconComp = iconMap[stat.icon];
            return (
              <div key={stat.id} className="stat-card bg-white/[0.08] rounded-xl p-8 text-center">
                {IconComp && <IconComp className="w-9 h-9 text-white/40 mx-auto mb-4" />}
                <div className="w-10 h-0.5 bg-blue-400 mx-auto mb-4" />
                <div className="font-jetbrains text-4xl md:text-5xl font-bold text-white mb-2">
                  {counts[i].toLocaleString('fr-FR')}{stat.suffix}
                </div>
                <p className="text-white/70 text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Qualiopi Banner */}
        <div className="stat-card mt-12 text-center flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Qualiopi</span>
          </div>
          <p className="text-white/60 text-sm">
            NDA 11 75 48 369 — Les formations peuvent etre financees par votre Compte Personnel de Formation (CPF), votre OPCO, Pole emploi ou votre Region.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5: CPF FINANCING HIGHLIGHT
   ═══════════════════════════════════════════ */
function CpfSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cpf-left', { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.cpf-right', { x: 30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const checkItems = [
    'Verifiez votre solde CPF en quelques clics',
    'Simulez votre reste a charge en 2 minutes',
    'Notre equipe s\'occupe de toutes les demarches administratives',
    '97% de nos stagiaires beneficient d\'un financement total',
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left */}
          <div className="cpf-left lg:col-span-3">
            <p className="text-orange-400 text-xs font-semibold uppercase tracking-[0.1em] mb-3">
              FINANCEMENT CPF
            </p>
            <h2 className="text-2xl md:text-4xl xl:text-[44px] font-bold text-white leading-tight mb-6">
              Votre formation a 0 EUR ? C'est possible avec le CPF
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              Le Compte Personnel de Formation (CPF) vous permet de financer votre formation professionnelle.
              Selon votre situation, votre OPCO, Pole emploi ou votre Region peuvent completer votre financement.
              Notre equipe vous accompagne dans toutes les demarches.
            </p>
            <ul className="space-y-3 mb-8">
              {checkItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#/financement"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-stone-100 transition-all duration-200 hover:scale-[1.02]"
            >
              <Calculator className="w-5 h-5" />
              Simuler mon financement
            </a>
          </div>

          {/* Right */}
          <div className="cpf-right lg:col-span-2 relative">
            <img
              src="/formation-digital.jpg"
              alt="Formation digitale"
              className="rounded-2xl shadow-2xl w-full -rotate-2"
            />
            <div className="absolute -bottom-6 -right-4 md:right-4 bg-white rounded-xl shadow-lg p-5 max-w-[220px]">
              <p className="text-sm text-stone-500 mb-1">Mon solde CPF</p>
              <p className="text-2xl font-bold text-blue-600 font-jetbrains">2 480 EUR</p>
              <p className="text-xs text-stone-500 mt-1">Suffisant pour 85% de nos formations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6: TESTIMONIALS
   ═══════════════════════════════════════════ */
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testi-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.fromTo('.testi-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.15,
        scrollTrigger: { trigger: '.testi-grid', start: 'top 85%' },
      });
      gsap.fromTo('.testi-rating', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: '.testi-rating', start: 'top 90%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-[120px]" style={{ backgroundColor: '#F5F5F0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="testi-header text-center mb-12">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-[0.1em] mb-3">
            ILS NOUS FONT CONFIANCE
          </p>
          <h2 className="text-2xl md:text-4xl xl:text-[44px] font-bold text-stone-900 leading-tight">
            Des parcours reussis, des vies transformees
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="testi-grid hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="testi-card bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-blue-200 text-6xl font-playfair leading-none mb-4">&ldquo;</div>
              <p className="text-stone-700 italic text-base leading-relaxed mb-6 font-playfair">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-bold text-stone-900 text-sm">{t.name}</p>
                  <p className="text-stone-500 text-xs">{t.training}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="testi-card bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-blue-200 text-6xl font-playfair leading-none mb-4">&ldquo;</div>
            <p className="text-stone-700 italic text-base leading-relaxed mb-6 font-playfair">
              {testimonials[activeIndex].quote}
            </p>
            <div className="flex items-center gap-4">
              <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-bold text-stone-900 text-sm">{testimonials[activeIndex].name}</p>
                <p className="text-stone-500 text-xs">{testimonials[activeIndex].training}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeIndex ? 'bg-blue-600' : 'bg-stone-300'}`}
                aria-label={`Temoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Rating Summary */}
        <div className="testi-rating mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-3">
            <span className="font-jetbrains text-3xl font-bold text-stone-900">4.8/5</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-stone-500 text-sm">sur 432 avis verifies</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-stone-300" />
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <span>Google Reviews <strong className="text-stone-900">4.7/5</strong></span>
            <span>Trustpilot <strong className="text-stone-900">4.9/5</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7: BLOG PREVIEW
   ═══════════════════════════════════════════ */
function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-header', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.fromTo('.blog-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="blog-header flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-blue-600 text-xs font-semibold uppercase tracking-[0.1em] mb-3">
              CONSEILS & ACTUALITES
            </p>
            <h2 className="text-2xl md:text-4xl xl:text-[44px] font-bold text-stone-900 leading-tight">
              Tout pour reussir votre reconversion
            </h2>
          </div>
          <a href="#/blog" className="hidden md:inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors mt-4 md:mt-0">
            Tous les articles <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={`#/blog/${post.slug}`}
              className="blog-card group block bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-[200px] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full">{post.tag}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-stone-500 line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-600 inline-flex items-center gap-1">
                    Lire la suite <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs text-stone-400">{post.readTime} de lecture</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <a href="#/blog" className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Tous les articles <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8: FINAL CTA
   ═══════════════════════════════════════════ */
function FinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-anim', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-[120px] bg-navy">
      <div className="max-w-4xl mx-auto px-6 lg:px-20 text-center">
        <h2 className="cta-anim text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6">
          Pret a transformer votre carriere ?
        </h2>
        <p className="cta-anim text-lg text-white/80 max-w-2xl mx-auto mb-10">
          Rejoignez plus de 5 000 professionnels formes chaque annee. Nos conseillers vous accompagnent gratuitement dans le choix de votre formation et son financement.
        </p>
        <div className="cta-anim flex flex-wrap justify-center gap-4 mb-6">
          <a
            href="#/financement"
            className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-full shadow-xl shadow-orange-500/30 transition-all duration-200 hover:scale-[1.02]"
          >
            Consulter mon CPF
          </a>
          <a
            href="tel:0123456789"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 transition-all inline-flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            01 23 45 67 89
          </a>
        </div>
        <p className="cta-anim text-white/60 text-sm mt-4">
          Ou remplissez notre{' '}
          <a href="#/contact" className="underline hover:text-white transition-colors">
            formulaire de contact
          </a>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <DomainsSection />
      <FeaturedTrainingsSection />
      <StatsSection />
      <CpfSection />
      <TestimonialsSection />
      <BlogSection />
      <FinalCtaSection />
    </>
  );
}

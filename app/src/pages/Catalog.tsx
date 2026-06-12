import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search, ChevronLeft, ChevronRight, Filter,
  Monitor, Users, Globe, Shield, HardHat, ShoppingCart, Heart, FolderKanban, ChevronRight as ChevronRightIcon,
  X
} from 'lucide-react';
import { trainings } from '../data/trainings';
import { domains } from '../data/trainings';
import TrainingCard from '../components/TrainingCard';
import FilterSidebar, { defaultFilters, type Filters } from '../components/FilterSidebar';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Monitor, Users, Globe, Shield, HardHat, ShoppingCart, Heart, FolderKanban,
};

const TRAININGS_PER_PAGE = 12;

/* ─── Domain filter mapping ─── */
const domainFilterMap: Record<string, string> = {
  digital: 'Digital & Informatique',
  management: 'Management & Leadership',
  langues: 'Langues & Communication',
  securite: 'Securite & Surete',
  btp: 'BTP & Construction',
  commerce: 'Commerce & Vente',
  sante: 'Sante & Social',
  projet: 'Gestion de Projet',
};

/* ─── Pagination Component ─── */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Page precedente"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={
            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ' +
            (p === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50')
          }
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Page suivante"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CATALOG PAGE
   ═══════════════════════════════════════════ */
export default function Catalog() {
  const [searchParams] = useSearchParams();
  const domainParam = searchParams.get('domain');

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(() => {
    const initial: Filters = { ...defaultFilters };
    if (domainParam && domainFilterMap[domainParam]) {
      initial.domains = [domainFilterMap[domainParam]];
    }
    return initial;
  });
  const [sortBy, setSortBy] = useState('Pertinence');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ─── Sync filters with URL param ─── */
  useEffect(() => {
    if (domainParam && domainFilterMap[domainParam]) {
      setFilters((prev) => ({
        ...prev,
        domains: [domainFilterMap[domainParam]],
      }));
    }
  }, [domainParam]);

  /* ─── GSAP Animations ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.catalog-header-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
      gsap.fromTo('.catalog-header-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.1 });
      gsap.fromTo('.catalog-header-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.catalog-search', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.catalog-sidebar', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, delay: 0.3 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ─── Filter + Search Logic ─── */
  const filteredTrainings = useMemo(() => {
    let result = [...trainings];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.domain.toLowerCase().includes(q)
      );
    }

    // Domain filter
    if (filters.domains.length > 0) {
      result = result.filter((t) =>
        filters.domains.some((d) => t.domain.includes(d.split(' ')[0]))
      );
    }

    // Level filter
    if (filters.levels.length > 0) {
      result = result.filter((t) =>
        filters.levels.some((l) => t.level.includes(l.split(' ')[1]))
      );
    }

    // Format filter
    if (filters.formats.length > 0) {
      result = result.filter((t) =>
        filters.formats.some((f) => t.format.toLowerCase().includes(f.toLowerCase()))
      );
    }

    // CPF filter
    if (filters.financing.includes('Eligible CPF')) {
      result = result.filter((t) => t.cpfEligible);
    }

    // Sort
    if (sortBy === 'Prix croissant') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Prix decroissant') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredTrainings.length / TRAININGS_PER_PAGE));
  const paginatedTrainings = filteredTrainings.slice(
    (currentPage - 1) * TRAININGS_PER_PAGE,
    currentPage * TRAININGS_PER_PAGE
  );

  /* ─── Active filter pills ─── */
  const activePills: { key: string; label: string; onRemove: () => void }[] = [];
  filters.domains.forEach((d) => {
    activePills.push({ key: `d-${d}`, label: d, onRemove: () => setFilters({ ...filters, domains: filters.domains.filter((x) => x !== d) }) });
  });
  filters.levels.forEach((l) => {
    activePills.push({ key: `l-${l}`, label: l, onRemove: () => setFilters({ ...filters, levels: filters.levels.filter((x) => x !== l) }) });
  });
  filters.formats.forEach((f) => {
    activePills.push({ key: `f-${f}`, label: f, onRemove: () => setFilters({ ...filters, formats: filters.formats.filter((x) => x !== f) }) });
  });
  if (filters.duration) {
    activePills.push({ key: 'dur', label: filters.duration, onRemove: () => setFilters({ ...filters, duration: '' }) });
  }
  filters.financing.forEach((f) => {
    activePills.push({ key: `fin-${f}`, label: f, onRemove: () => setFilters({ ...filters, financing: filters.financing.filter((x) => x !== f) }) });
  });
  if (filters.session) {
    activePills.push({ key: 'sess', label: filters.session, onRemove: () => setFilters({ ...filters, session: '' }) });
  }

  return (
    <div ref={pageRef}>
      {/* ═══ SECTION 1: Page Header ═══ */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {/* Breadcrumb */}
          <nav className="catalog-header-badge flex items-center gap-2 text-sm text-white/70 mb-6">
            <a href="#/" className="hover:text-white transition-colors">Accueil</a>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-white font-medium">Catalogue des formations</span>
          </nav>

          {/* Title */}
          <h1 className="catalog-header-title text-3xl md:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
            Notre catalogue de formations
          </h1>

          {/* Subtitle */}
          <p className="catalog-header-sub text-lg text-white/85 max-w-[700px] mb-8">
            Plus de 120 formations professionnelles dans 8 domaines d&apos;excellence. Toutes nos formations sont certifiantes, eligibles au CPF et certifiees Qualiopi.
          </p>

          {/* Search Bar */}
          <div className="catalog-search max-w-[720px]">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Rechercher une formation (ex: developpeur web, management, anglais...)"
                className="w-full h-14 pl-14 pr-6 bg-white rounded-full shadow-lg text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: Filters & Results ═══ */}
      <section className="py-10" style={{ backgroundColor: '#F5F5F0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {/* Mobile filter toggle */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filtres
              {activePills.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {activePills.length}
                </span>
              )}
            </button>
          </div>

          {/* Active filter pills (mobile + desktop) */}
          {activePills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activePills.map((pill) => (
                <span
                  key={pill.key}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium"
                >
                  {pill.label}
                  <button onClick={pill.onRemove} className="hover:text-blue-200 transition-colors" aria-label="Retirer le filtre">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <button
                onClick={() => setFilters({ ...defaultFilters })}
                className="text-sm font-medium text-stone-500 hover:text-red-600 transition-colors px-2"
              >
                Tout effacer
              </button>
            </div>
          )}

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className="catalog-sidebar">
              <FilterSidebar
                filters={filters}
                onChange={(f) => { setFilters(f); setCurrentPage(1); }}
                mobileOpen={mobileFiltersOpen}
                onMobileClose={() => setMobileFiltersOpen(false)}
              />
            </div>

            {/* Results */}
            <div className="flex-1 min-w-0" ref={resultsRef}>
              {/* Results Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <p className="text-base text-stone-600">
                  <span className="font-bold text-blue-600">{filteredTrainings.length}</span>{' '}
                  formation{filteredTrainings.length > 1 ? 's' : ''} trouvee{filteredTrainings.length > 1 ? 's' : ''}
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-stone-500">Trier par</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                  >
                    <option>Pertinence</option>
                    <option>Prix croissant</option>
                    <option>Prix decroissant</option>
                    <option>Duree</option>
                    <option>Dernieres sessions</option>
                  </select>
                </div>
              </div>

              {/* Results Grid */}
              {paginatedTrainings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedTrainings.map((training, i) => (
                    <TrainingCard key={training.id} training={training} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
                  <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">Aucune formation trouvee</h3>
                  <p className="text-stone-500 mb-4">Essayez de modifier vos filtres ou votre recherche.</p>
                  <button
                    onClick={() => { setFilters({ ...defaultFilters }); setSearchQuery(''); }}
                    className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Reinitialiser
                  </button>
                </div>
              )}

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: Domain Quick Access ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.1em] mb-3">
              PARCOURIR PAR DOMAINE
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-stone-900 leading-tight">
              Trouvez votre formation par metier
            </h2>
          </div>

          {/* Domain Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {domains.map((d) => {
              const IconComp = iconMap[d.icon];
              const domainCount = trainings.filter((t) => t.domain.includes(d.title.split(' ')[0])).length;
              return (
                <a
                  key={d.id}
                  href={`#/catalogue?domain=${d.slug}`}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-stone-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: d.color + '15' }}
                  >
                    {IconComp && <IconComp className="w-5 h-5" style={{ color: d.color }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-stone-900 truncate">{d.title}</p>
                    <p className="text-xs text-stone-500">{domainCount} formation{domainCount > 1 ? 's' : ''}</p>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: CPF Banner ═══ */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-lg">
                Vous ne trouvez pas la formation ideale ?
              </p>
              <p className="text-white/80 text-sm mt-1">
                Nos conseillers vous aident a faire le bon choix.
              </p>
            </div>
            <a
              href="#/contact"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-stone-100 transition-colors shadow-lg whitespace-nowrap"
            >
              Contacter un conseiller
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

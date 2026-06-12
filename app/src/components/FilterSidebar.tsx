import { X } from 'lucide-react';

/* ─── Filter Options ─── */
const domainOptions = [
  { label: 'Digital & Informatique', count: 32 },
  { label: 'Management & Leadership', count: 18 },
  { label: 'Langues & Communication', count: 15 },
  { label: 'Commerce & Vente', count: 12 },
  { label: 'Securite & Surete', count: 10 },
  { label: 'BTP & Construction', count: 14 },
  { label: 'Sante & Social', count: 11 },
  { label: 'Gestion de Projet', count: 8 },
];

const levelOptions = [
  { label: 'Niveau 3 — CAP/BEP', count: 15 },
  { label: 'Niveau 4 — Baccalaureat', count: 22 },
  { label: 'Niveau 5 — Bac+2', count: 38 },
  { label: 'Niveau 6 — Bac+3', count: 28 },
  { label: 'Niveau 7 — Bac+5', count: 12 },
];

const formatOptions = [
  { label: 'Presentiel', count: 78 },
  { label: 'Distanciel', count: 45 },
  { label: 'Alternance', count: 22 },
  { label: 'En entreprise', count: 15 },
];

const durationOptions = [
  { label: "Moins d'1 mois", count: 18 },
  { label: '1 a 3 mois', count: 35 },
  { label: '3 a 6 mois', count: 28 },
  { label: '6 a 12 mois', count: 22 },
  { label: "Plus d'1 an", count: 8 },
];

const financingOptions = [
  { label: 'Eligible CPF', count: 98 },
  { label: 'Pole emploi', count: 42 },
  { label: 'OPCO', count: 85 },
  { label: 'Region', count: 35 },
  { label: 'Alternance financee', count: 22 },
];

const sessionOptions = [
  { label: 'Janvier 2026', count: 45 },
  { label: 'Fevrier 2026', count: 38 },
  { label: 'Mars 2026', count: 32 },
  { label: 'Avril 2026', count: 28 },
  { label: 'Plus tard', count: 15 },
];

/* ─── Types ─── */
export interface Filters {
  domains: string[];
  levels: string[];
  formats: string[];
  duration: string;
  financing: string[];
  session: string;
}

export const defaultFilters: Filters = {
  domains: [],
  levels: [],
  formats: [],
  duration: '',
  financing: [],
  session: '',
};

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

/* ─── Checkbox Component ─── */
function FilterCheckbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="w-4 h-4 rounded border border-stone-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors" />
        <svg
          className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 8L7 11L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors flex-1">
        {label}
      </span>
      <span className="text-xs text-stone-400">({count})</span>
    </label>
  );
}

/* ─── Radio Component ─── */
function FilterRadio({
  name,
  checked,
  onChange,
  label,
  count,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <div className="relative flex items-center">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="w-4 h-4 rounded-full border border-stone-300 bg-white peer-checked:border-blue-600 peer-checked:border-[5px] transition-all" />
      </div>
      <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors flex-1">
        {label}
      </span>
      <span className="text-xs text-stone-400">({count})</span>
    </label>
  );
}

/* ─── Filter Group ─── */
function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wide mb-3">
        {title}
      </h4>
      <div className="space-y-0.5">{children}</div>
      <div className="mt-5 border-b border-stone-200" />
    </div>
  );
}

/* ─── Main Component ─── */
export default function FilterSidebar({
  filters,
  onChange,
  mobileOpen,
  onMobileClose,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.domains.length > 0 ||
    filters.levels.length > 0 ||
    filters.formats.length > 0 ||
    filters.duration !== '' ||
    filters.financing.length > 0 ||
    filters.session !== '';

  const handleReset = () => onChange({ ...defaultFilters });

  const toggleArray = (key: keyof Filters, value: string) => {
    const arr = filters[key] as string[];
    const newArr = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onChange({ ...filters, [key]: newArr });
  };

  const sidebarContent = (
    <>
      {/* Header (mobile only) */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-stone-900">Filtres</h3>
        <button
          onClick={onMobileClose}
          className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Fermer les filtres"
        >
          <X className="w-5 h-5 text-stone-600" />
        </button>
      </div>

      {/* Active filter count + reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-stone-500">
            {(
              filters.domains.length +
              filters.levels.length +
              filters.formats.length +
              (filters.duration ? 1 : 0) +
              filters.financing.length +
              (filters.session ? 1 : 0)
            )}{' '}
            filtre(s) actif(s)
          </span>
          <button
            onClick={handleReset}
            className="text-sm font-medium text-stone-500 hover:text-red-600 transition-colors"
          >
            Tout effacer
          </button>
        </div>
      )}

      {/* Domaine */}
      <FilterGroup title="Domaine">
        {domainOptions.map((opt) => (
          <FilterCheckbox
            key={opt.label}
            checked={filters.domains.includes(opt.label)}
            onChange={() => toggleArray('domains', opt.label)}
            label={opt.label}
            count={opt.count}
          />
        ))}
      </FilterGroup>

      {/* Niveau */}
      <FilterGroup title="Niveau">
        {levelOptions.map((opt) => (
          <FilterCheckbox
            key={opt.label}
            checked={filters.levels.includes(opt.label)}
            onChange={() => toggleArray('levels', opt.label)}
            label={opt.label}
            count={opt.count}
          />
        ))}
      </FilterGroup>

      {/* Format */}
      <FilterGroup title="Format">
        {formatOptions.map((opt) => (
          <FilterCheckbox
            key={opt.label}
            checked={filters.formats.includes(opt.label)}
            onChange={() => toggleArray('formats', opt.label)}
            label={opt.label}
            count={opt.count}
          />
        ))}
      </FilterGroup>

      {/* Duree */}
      <FilterGroup title="Duree">
        {durationOptions.map((opt) => (
          <FilterRadio
            key={opt.label}
            name="duration"
            checked={filters.duration === opt.label}
            onChange={() => onChange({ ...filters, duration: opt.label })}
            label={opt.label}
            count={opt.count}
          />
        ))}
      </FilterGroup>

      {/* Financement */}
      <FilterGroup title="Financement">
        {financingOptions.map((opt) => (
          <FilterCheckbox
            key={opt.label}
            checked={filters.financing.includes(opt.label)}
            onChange={() => toggleArray('financing', opt.label)}
            label={opt.label}
            count={opt.count}
          />
        ))}
      </FilterGroup>

      {/* Prochaine session */}
      <FilterGroup title="Prochaine session">
        {sessionOptions.map((opt) => (
          <FilterRadio
            key={opt.label}
            name="session"
            checked={filters.session === opt.label}
            onChange={() => onChange({ ...filters, session: opt.label })}
            label={opt.label}
            count={opt.count}
          />
        ))}
      </FilterGroup>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="w-full py-2.5 text-sm font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-lg transition-colors border border-stone-200"
      >
        Reinitialiser les filtres
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[280px] flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-stone-200 p-6">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={onMobileClose}>
          <div
            className="absolute left-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-white p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, CheckCircle, GraduationCap, Shield, Users, Monitor, BarChart3, Globe, Heart, ShoppingCart, FolderKanban, HardHat } from 'lucide-react';

const navLinks = [
  {
    label: 'Formations',
    href: '/#/catalogue',
    hasDropdown: true,
    dropdownItems: [
      { icon: Monitor, label: 'Digital & Informatique', href: '/#/catalogue?domain=digital', color: '#2563EB' },
      { icon: BarChart3, label: 'Management & Leadership', href: '/#/catalogue?domain=management', color: '#7C3AED' },
      { icon: Globe, label: 'Langues & Communication', href: '/#/catalogue?domain=langues', color: '#0891B2' },
      { icon: Shield, label: 'Securite & Surete', href: '/#/catalogue?domain=securite', color: '#DC2626' },
      { icon: HardHat, label: 'BTP & Construction', href: '/#/catalogue?domain=btp', color: '#B45309' },
      { icon: ShoppingCart, label: 'Commerce & Vente', href: '/#/catalogue?domain=commerce', color: '#059669' },
      { icon: Heart, label: 'Sante & Social', href: '/#/catalogue?domain=sante', color: '#EC4899' },
      { icon: FolderKanban, label: 'Gestion de Projet', href: '/#/catalogue?domain=projet', color: '#F97316' },
    ],
  },
  { label: 'Financement', href: '/#/financement', hasDropdown: false },
  { label: 'Entreprises', href: '/#/entreprises', hasDropdown: false },
  { label: 'A propos', href: '/#/a-propos', hasDropdown: false },
  { label: 'Blog', href: '/#/blog', hasDropdown: false },
  { label: 'Contact', href: '/#/contact', hasDropdown: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={
          'fixed top-0 left-0 right-0 z-40 h-[72px] flex items-center transition-all duration-300 ' +
          (scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm'
            : 'bg-white')
        }
      >
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#/" className="flex-shrink-0">
            <img
              src="/logo-novaforma.svg"
              alt="Novaforma"
              className="h-7 w-auto"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-stone-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-stone-50"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                {/* Dropdown */}
                {link.hasDropdown && dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[640px] bg-white rounded-xl shadow-xl border border-stone-200 p-4 grid grid-cols-2 gap-2">
                    {link.dropdownItems?.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: item.color + '15' }}
                          >
                            <IconComp className="w-5 h-5" style={{ color: item.color }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-stone-900">{item.label}</p>
                            <p className="text-xs text-stone-500 mt-0.5">Voir les formations</p>
                          </div>
                        </a>
                      );
                    })}
                    <div className="col-span-2 mt-2 pt-2 border-t border-stone-100">
                      <a
                        href="/#/catalogue"
                        className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Voir toutes les formations
                        <span className="text-lg">&rarr;</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/#/espace-stagiaire"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-stone-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-stone-50"
            >
              <User className="w-4 h-4" />
              Mon espace
            </a>
            <a
              href="/#/financement"
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Consulter mon CPF
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6 text-stone-700" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-stone-200">
              <a href="#/" onClick={() => setMobileOpen(false)}>
                <img src="/logo-novaforma.svg" alt="Novaforma" className="h-7 w-auto" />
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6 text-stone-700" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-stone-800 hover:text-blue-600 hover:bg-stone-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                    {link.hasDropdown && link.dropdownItems && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdownItems.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-stone-600 hover:text-blue-600 hover:bg-stone-50 rounded-lg transition-colors"
                            >
                              <IconComp className="w-4 h-4" style={{ color: item.color }} />
                              {item.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <a
                  href="/#/espace-stagiaire"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-medium text-stone-700 border border-stone-300 rounded-full hover:bg-stone-50 transition-colors"
                >
                  <User className="w-5 h-5" />
                  Mon espace stagiaire
                </a>
                <a
                  href="/#/financement"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Consulter mon CPF
                </a>
              </div>
              <div className="mt-8 pt-6 border-t border-stone-200">
                <div className="flex items-center justify-center gap-6 text-stone-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs">Qualiopi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span className="text-xs">CPF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-stone-500" />
                    <span className="text-xs">5000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

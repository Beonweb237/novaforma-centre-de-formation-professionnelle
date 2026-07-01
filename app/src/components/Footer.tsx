import { CheckCircle, Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';

const formationLinks = [
  'Digital & Informatique',
  'Management & Leadership',
  'Langues & Communication',
  'Securite & Surete',
  'BTP & Construction',
  'Commerce & Vente',
  'Sante & Social',
  'Gestion de Projet',
  'Catalogue complet',
];

const infoLinks = [
  { label: 'A propos', href: '/#/a-propos' },
  { label: 'Qualiopi', href: '/#/a-propos' },
  { label: 'Blog', href: '/#/blog' },
  { label: 'Contact', href: '/#/contact' },
  { label: 'CGV', href: '/#' },
  { label: 'Mentions legales', href: '/#' },
  { label: 'Politique RGPD', href: '/#' },
  { label: 'Accessibilite', href: '/#' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <img src="/logo-novaforma-dark.svg" alt="Novaforma" className="h-8 w-auto mb-4" />
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Centre de formation professionnelle certifie Qualiopi. Plus de 120 formations eligible CPF pour transformer votre carriere.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Certifie Qualiopi</span>
            </div>
          </div>

          {/* Col 2: Formations */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Formations</h4>
            <ul className="space-y-2">
              {formationLinks.map((link) => (
                <li key={link}>
                  <a
                    href="/#/catalogue"
                    className="text-white/70 hover:text-orange-400 text-sm transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Informations */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Informations</h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-orange-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  15 rue de la Formation<br />
                  75011 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/50 flex-shrink-0" />
                <a href="tel:0123456789" className="text-white/70 hover:text-orange-400 text-sm transition-colors">
                  01 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/50 flex-shrink-0" />
                <a href="mailto:contact@novaforma.fr" className="text-white/70 hover:text-orange-400 text-sm transition-colors">
                  contact@novaforma.fr
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-white/50 text-xs mb-3">Du lundi au vendredi, 9h - 18h</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            NDA 11 75 48 369 — Organisme de formation agree
          </p>
          <p className="text-white/50 text-xs">
            &copy; 2026 Novaforma. Tous droits reserves.
            {' '}&mdash;{' '}
            <a
              href="https://www.beonweb.cm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors duration-200"
            >
              Powered by <span className="text-white/70">Beonweb</span>
            </a>
          </p>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span className="text-white/50 text-xs">Qualiopi certifie</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

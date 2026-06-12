import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone,
  Mail,
  MapPin,
  User,
  Building2,
  Handshake,
  Send,
  ChevronDown,
  ExternalLink,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────── data ─────────────────────── */

const locations = [
  {
    city: 'Paris',
    address: '12 rue de la Formation, 75015 Paris',
    hours: 'Lun-Ven : 8h30-19h, Sam : 9h-13h',
    phone: '01 23 45 67 89',
  },
  {
    city: 'Lyon',
    address: '45 avenue des Brotteaux, 69006 Lyon',
    hours: 'Lun-Ven : 9h-18h',
    phone: '04 56 78 90 12',
  },
  {
    city: 'Marseille',
    address: '8 boulevard Longchamp, 13001 Marseille',
    hours: 'Lun-Ven : 9h-18h',
    phone: '04 91 23 45 67',
  },
  {
    city: 'Bordeaux',
    address: '22 cours de l\'Intendance, 33000 Bordeaux',
    hours: 'Lun-Ven : 9h-18h',
    phone: '05 56 78 90 12',
  },
];

const faqItems = [
  {
    question: 'Comment s\'inscrire a une formation ?',
    answer: 'Rendez-vous sur la page de la formation qui vous interesse et cliquez sur \'S\'inscrire\'. Vous pouvez aussi nous appeler au 01 23 45 67 89 pour etre accompagne(e).',
  },
  {
    question: 'Puis-je visiter vos locaux avant de m\'inscrire ?',
    answer: 'Oui, nous organisons des journees portes ouvertes chaque premier samedi du mois. Vous pouvez aussi prendre rendez-vous pour une visite individuelle.',
  },
  {
    question: 'Quels sont les delais d\'inscription ?',
    answer: 'Nous vous recommandons de vous inscrire au moins 1 mois avant le debut de la formation pour avoir le temps de monter votre dossier de financement.',
  },
  {
    question: 'Proposez-vous des formations en soiree ou le week-end ?',
    answer: 'Oui, certaines formations (notamment les langues et le digital) sont disponibles en cours du soir (18h30-21h30) et le samedi. Consultez le detail de chaque formation.',
  },
  {
    question: 'Que se passe-t-il si je ne peux pas assister a une seance ?',
    answer: 'Vous pouvez rattraper votre seance lors d\'une session ulterieure ou via notre plateforme e-learning. Nous proposons un suivi pedagogique pour vous aider a ne rien manquer.',
  },
  {
    question: 'Comment obtenir ma certification ?',
    answer: 'La certification est delivree apres validation des blocs de competences en situation professionnelle (projet, stage, ou alternance). Votre formateur vous accompagne tout au long du processus.',
  },
  {
    question: 'Aidez-vous a trouver un emploi apres la formation ?',
    answer: 'Oui, notre service insertion professionnelle vous accompagne : preparation aux entretiens, mise en relation avec notre reseau de partenaires recruteurs, ateliers CV et LinkedIn.',
  },
];

const trainingOptions = [
  'Developpement Web Full-Stack',
  'Data Analyst',
  'UX/UI Design',
  'Management & Leadership',
  'Marketing Digital',
  'Comptabilite & Gestion',
  'Langues (Anglais, Espagnol)',
  'Securite Informatique',
  'Gestion de Projet',
  'Je ne sais pas encore',
];

const tabs = [
  { id: 'particulier', label: 'Je suis un particulier', icon: User },
  { id: 'entreprise', label: 'Je represente une entreprise', icon: Building2 },
  { id: 'partenaire', label: 'Je suis un partenaire potentiel', icon: Handshake },
] as const;

type TabId = (typeof tabs)[number]['id'];

/* ─────────────────────── component ─────────────────────── */

export default function Contact() {
  const [activeTab, setActiveTab] = useState<TabId>('particulier');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  /* GSAP animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.contact-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.contact-stagger').forEach((container) => {
        const children = container.querySelectorAll('.contact-stagger-item');
        gsap.from(children, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div ref={pageRef}>
      {/* ═══════════ Section 1: Hero Header ═══════════ */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <nav className="text-sm text-white/70 mb-4 contact-reveal">
            <a href="#/" className="hover:text-white transition-colors">Accueil</a>
            <span className="mx-2">&gt;</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight contact-reveal">
            Contactez-nous
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl contact-reveal">
            Notre equipe est a votre disposition pour vous aider a choisir votre formation, monter votre dossier de financement ou repondre a vos questions.
          </p>
        </div>
      </section>

      {/* ═══════════ Section 2: Contact Options ═══════════ */}
      <section className="py-12 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid md:grid-cols-3 gap-6 contact-stagger">
            {/* Phone */}
            <div className="contact-stagger-item bg-white rounded-xl p-6 border border-stone-200 text-center hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mt-4">Par telephone</h3>
              <p className="text-base text-stone-600 mt-2">Du lundi au vendredi, 9h-18h</p>
              <a
                href="tel:0123456789"
                className="inline-block mt-3 text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                01 23 45 67 89
              </a>
            </div>

            {/* Email */}
            <div className="contact-stagger-item bg-white rounded-xl p-6 border border-stone-200 text-center hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mt-4">Par email</h3>
              <p className="text-base text-stone-600 mt-2">Reponse sous 24h ouvrees</p>
              <a
                href="mailto:contact@novaforma.fr"
                className="inline-block mt-3 text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                contact@novaforma.fr
              </a>
            </div>

            {/* Address */}
            <div className="contact-stagger-item bg-white rounded-xl p-6 border border-stone-200 text-center hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mt-4">Sur rendez-vous</h3>
              <p className="text-base text-stone-600 mt-2">Paris, Lyon, Marseille, Bordeaux</p>
              <Button
                variant="outline"
                asChild
                className="mt-3 rounded-full border-[1.5px] border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold"
              >
                <a href="#locations">Prendre rendez-vous</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Section 3: Multi-Profile Form ═══════════ */}
      <section className="py-20 lg:py-[120px] bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-20">
          <div className="text-center contact-reveal">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Formulaire de contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3">
              Envoyez-nous un message
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 contact-reveal">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    'flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all duration-200 border-b-2 ' +
                    (isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-stone-400 hover:text-stone-600')
                  }
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Success message */}
          {submitted && (
            <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-4 contact-reveal">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-800">
                  Votre message a bien ete envoye.
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  Nous vous repondrons sous 24h.
                </p>
                <a
                  href="#/"
                  className="inline-block mt-2 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Retour a l&apos;accueil
                </a>
              </div>
            </div>
          )}

          {/* Form container */}
          {!submitted && (
            <div className="mt-6 bg-[#F5F5F0] rounded-2xl p-6 md:p-8 contact-reveal">
              {/* ─── Tab 1: Particulier ─── */}
              {activeTab === 'particulier' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prenom *</Label>
                      <Input id="prenom" placeholder="Votre prenom" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input id="nom" placeholder="Votre nom" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-ind">Email *</Label>
                      <Input id="email-ind" type="email" placeholder="votre@email.fr" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tel-ind">Telephone</Label>
                      <Input id="tel-ind" type="tel" placeholder="+33 6 12 34 56 78" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="situation">Situation actuelle</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salarie">Salarie</SelectItem>
                          <SelectItem value="demandeur">Demandeur d&apos;emploi</SelectItem>
                          <SelectItem value="independant">Independant</SelectItem>
                          <SelectItem value="etudiant">Etudiant</SelectItem>
                          <SelectItem value="reconversion">En reconversion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formation">Formation interessee</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          {trainingOptions.map((opt) => (
                            <SelectItem key={opt} value={opt.toLowerCase().replace(/\s+/g, '-')}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="objet">Objet</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Information sur une formation</SelectItem>
                          <SelectItem value="financement">Aide au financement</SelectItem>
                          <SelectItem value="inscription">Inscription</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message-ind">Message</Label>
                      <Textarea
                        id="message-ind"
                        rows={4}
                        placeholder="Decrivez votre projet, vos questions, vos contraintes..."
                        className="bg-white resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="consent-ind" required />
                    <Label htmlFor="consent-ind" className="text-sm font-normal leading-relaxed cursor-pointer">
                      J&apos;accepte que Novaforma me contacte au sujet de ma demande *
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-base transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer ma demande
                  </Button>
                </form>
              )}

              {/* ─── Tab 2: Entreprise ─── */}
              {activeTab === 'entreprise' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="entreprise">Nom de l&apos;entreprise *</Label>
                      <Input id="entreprise" placeholder="Votre entreprise" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secteur">Secteur d&apos;activite</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technologie / IT</SelectItem>
                          <SelectItem value="finance">Finance / Banque / Assurance</SelectItem>
                          <SelectItem value="sante">Sante / Social</SelectItem>
                          <SelectItem value="industrie">Industrie</SelectItem>
                          <SelectItem value="commerce">Commerce / Distribution</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaries">Nombre de salaries</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1 - 10</SelectItem>
                          <SelectItem value="11-50">11 - 50</SelectItem>
                          <SelectItem value="51-250">51 - 250</SelectItem>
                          <SelectItem value="251+">251 et plus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Votre nom *</Label>
                      <Input id="contact-name" placeholder="Votre nom" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fonction">Votre fonction</Label>
                      <Input id="fonction" placeholder="RH, Manager, DG..." className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-pro">Email professionnel *</Label>
                      <Input id="email-pro" type="email" placeholder="votre@entreprise.fr" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tel-pro">Telephone</Label>
                      <Input id="tel-pro" type="tel" placeholder="+33 1 23 45 67 89" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="besoin">Type de besoin</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="intra">Formation intra-entreprise</SelectItem>
                          <SelectItem value="alternance">Alternance</SelectItem>
                          <SelectItem value="sur-mesure">Formation sur mesure</SelectItem>
                          <SelectItem value="devis">Devis global</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message-pro">Message</Label>
                      <Textarea
                        id="message-pro"
                        rows={4}
                        placeholder="Decrivez votre projet de formation, le nombre de participants, vos objectifs..."
                        className="bg-white resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="consent-pro" required />
                    <Label htmlFor="consent-pro" className="text-sm font-normal leading-relaxed cursor-pointer">
                      J&apos;accepte que Novaforma me contacte au sujet de ma demande *
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full text-base transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Demander un devis
                  </Button>
                </form>
              )}

              {/* ─── Tab 3: Partenaire ─── */}
              {activeTab === 'partenaire' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="orga">Nom de l&apos;organisation *</Label>
                      <Input id="orga" placeholder="Votre organisation" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type-part">Type de partenariat</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="opca">OPCA</SelectItem>
                          <SelectItem value="opco">OPCO</SelectItem>
                          <SelectItem value="entreprise">Entreprise partenaire</SelectItem>
                          <SelectItem value="institution">Institution</SelectItem>
                          <SelectItem value="prescripteur">Prescripteur</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom-part">Votre nom *</Label>
                      <Input id="nom-part" placeholder="Votre nom" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fonction-part">Votre fonction</Label>
                      <Input id="fonction-part" placeholder="Votre fonction" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-part">Email *</Label>
                      <Input id="email-part" type="email" placeholder="votre@email.fr" required className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tel-part">Telephone</Label>
                      <Input id="tel-part" type="tel" placeholder="+33 6 12 34 56 78" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Selectionnez..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ile-de-france">Ile-de-France</SelectItem>
                          <SelectItem value="auvergne-rhone-alpes">Auvergne-Rhone-Alpes</SelectItem>
                          <SelectItem value="paca">Provence-Alpes-Cote d&apos;Azur</SelectItem>
                          <SelectItem value="nouvelle-aquitaine">Nouvelle-Aquitaine</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialite">Specialite / domaine d&apos;expertise</Label>
                      <Input id="specialite" placeholder="Votre domaine..." className="bg-white" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message-part">Message</Label>
                      <Textarea
                        id="message-part"
                        rows={4}
                        placeholder="Decrivez votre proposition de partenariat..."
                        className="bg-white resize-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cv">Joindre un document (optionnel)</Label>
                      <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white">
                        <p className="text-sm text-stone-500">Cliquez pour televerser ou glissez-deposez</p>
                        <p className="text-xs text-stone-400 mt-1">PDF, DOC, DOCX (max 5 Mo)</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="consent-part" required />
                    <Label htmlFor="consent-part" className="text-sm font-normal leading-relaxed cursor-pointer">
                      J&apos;accepte que Novaforma me contacte au sujet de ma demande *
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-base transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer ma proposition
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* Response time note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-stone-500 contact-reveal">
            <Clock className="w-4 h-4" />
            <span>Nous vous repondons sous 24h</span>
          </div>
        </div>
      </section>

      {/* ═══════════ Section 4: FAQ ═══════════ */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-3xl mx-auto px-6 lg:px-20">
          <div className="text-center contact-reveal">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Foire aux questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3">
              Les questions les plus frequentes
            </h2>
          </div>

          <div className="mt-10 space-y-3 contact-stagger">
            {faqItems.map((faq, idx) => (
              <div
                key={idx}
                className="contact-stagger-item bg-white rounded-xl border border-stone-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-stone-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={
                      'w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ' +
                      (openFaq === idx ? 'rotate-180' : '')
                    }
                  />
                </button>
                <div
                  className={
                    'overflow-hidden transition-all duration-300 ' +
                    (openFaq === idx ? 'max-h-96' : 'max-h-0')
                  }
                >
                  <p className="px-6 pb-4 text-base text-stone-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Section 5: Locations ═══════════ */}
      <section id="locations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center contact-reveal">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Nos centres
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3">
              Trouvez un centre pres de chez vous
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 contact-stagger">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="contact-stagger-item bg-white rounded-xl border border-stone-200 p-6 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-stone-900">{loc.city}</h3>
                <p className="text-sm text-stone-600 mt-2">{loc.address}</p>
                <p className="text-sm text-stone-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {loc.hours}
                </p>
                <a
                  href={`tel:${loc.phone.replace(/\s/g, '')}`}
                  className="inline-block mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {loc.phone}
                </a>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-3 text-sm text-stone-500 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Voir sur Google Maps
                </a>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-12 h-[400px] rounded-2xl border border-stone-200 overflow-hidden bg-stone-100 contact-reveal">
            <iframe
              title="Carte des centres Novaforma"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.2%2C48.83%2C2.4%2C48.9&layer=mapnik&marker=48.8566%2C2.3522"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

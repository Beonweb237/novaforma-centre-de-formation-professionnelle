import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Heart,
  Users,
  Zap,
  CheckCircle,
  Phone,
  ExternalLink,
  BookOpen,
  Star,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────── data ─────────────────────── */

const values = [
  {
    icon: Award,
    title: 'Excellence pedagogique',
    description:
      'Nous exigeons la meilleure qualite de formation, avec des referentiels a jour, des outils modernes et une evaluation continue.',
    color: 'blue',
  },
  {
    icon: Heart,
    title: 'Accessibilite',
    description:
      'La formation doit etre accessible a tous. Nous proposons des modalites adaptees et un accompagnement personnalise pour chaque profil.',
    color: 'emerald',
  },
  {
    icon: Users,
    title: 'Proximite',
    description:
      'Nos equipes sont a votre ecoute. Un conseiller dedie vous accompagne de l\'inscription a l\'insertion professionnelle.',
    color: 'orange',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description:
      'Nous integrons les evolutions technologiques et pedagogiques pour proposer des formations toujours a la pointe.',
    color: 'purple',
  },
];

const criteria = [
  { title: 'Gestion des prestations', desc: 'Processus clairs pour la conception, l\'organisation et le suivi des formations.' },
  { title: 'Respect des engagements', desc: 'Nous honorons nos engagements en termes de contenu, de duree et de modalites.' },
  { title: 'Adequation des moyens pedagogiques', desc: 'Outils, locaux et supports adaptes aux objectifs de chaque formation.' },
  { title: 'Qualite des formateurs', desc: 'Selection rigoureuse, formation continue et evaluation des formateurs.' },
  { title: 'Prise en compte des evaluations', desc: 'Questionnaires de satisfaction et indicateurs de resultats systematiques.' },
  { title: 'Accompagnement des stagiaires', desc: 'Suivi individualise, remediation et aide a l\'insertion professionnelle.' },
  { title: 'Adaptation aux publics en situation de handicap', desc: 'Mise en oeuvre du referentiel Handicap et accessibilite.' },
];

const team = [
  {
    image: '/trainer-1.jpg',
    name: 'Sophie Moreau',
    role: 'Directrice Pedagogique',
    bio: '15 ans d\'experience dans la formation professionnelle. Ancienne DRH, elle a accompagne plus de 200 entreprises dans leurs projets de montee en competences.',
    tags: ['Management', 'RH'],
  },
  {
    image: '/trainer-2.jpg',
    name: 'Lucas Bernard',
    role: 'Responsable Formations Digital',
    bio: 'Developpeur full-stack de formation, Lucas a travaille 10 ans dans des startups tech avant de se consacrer a la transmission de son savoir-faire.',
    tags: ['Digital', 'Data'],
  },
  {
    image: '/trainer-3.jpg',
    name: 'Emma Petit',
    role: 'Formatrice Developpement Web',
    bio: 'Ancienne eleve de Novaforma, Emma a rejoint l\'equipe apres 4 ans comme developpeuse front-end. Elle connait parfaitement les enjeux de la reconversion.',
    tags: ['Digital', 'Web'],
  },
];

const stats = [
  { value: '2012', label: 'Annee de creation', icon: GraduationCap },
  { value: '5000+', label: 'Stagiaires formes/an', icon: Users },
  { value: '120+', label: 'Formations certifiantes', icon: BookOpen },
  { value: '92%', label: 'Taux de satisfaction', icon: Star },
];

const tagColorMap: Record<string, string> = {
  Management: 'bg-purple-100 text-purple-700',
  RH: 'bg-pink-100 text-pink-700',
  Digital: 'bg-blue-100 text-blue-700',
  Data: 'bg-cyan-100 text-cyan-700',
  Web: 'bg-indigo-100 text-indigo-700',
};

const valueIconBg: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  orange: 'bg-orange-100 text-orange-600',
  purple: 'bg-purple-100 text-purple-600',
};

/* ─────────────────────── component ─────────────────────── */

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Fade-up sections */
      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el) => {
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

      /* Stagger children */
      gsap.utils.toArray<HTMLElement>('.about-stagger').forEach((container) => {
        const children = container.querySelectorAll('.about-stagger-item');
        gsap.from(children, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
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

  return (
    <div ref={pageRef}>
      {/* ═══════════ Section 1: Hero ═══════════ */}
      <section
        className="relative min-h-[500px] flex items-end overflow-hidden"
        style={{
          backgroundImage: 'url(/campus.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(30,58,95,0.85) 0%, rgba(30,58,95,0.4) 50%, transparent 100%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-20 pb-16 pt-32">
          <nav className="text-sm text-white/70 mb-4 about-reveal">
            <a href="#/" className="hover:text-white transition-colors">Accueil</a>
            <span className="mx-2">&gt;</span>
            <span className="text-white">A propos</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-tight about-reveal">
            A propos de Novaforma
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl about-reveal">
            Depuis 2012, nous formons les professionnels de demain avec exigence, passion et engagement. Certifie Qualiopi, reconnu par l&apos;Etat.
          </p>
        </div>
      </section>

      {/* ═══════════ Section 2: Our Story ═══════════ */}
      <section className="py-20 lg:py-[120px] bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div className="about-stagger">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 about-stagger-item block">
                Notre histoire
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3 leading-tight about-stagger-item">
                De l&apos;idee a l&apos;excellence : 12 ans de passion pour la formation
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-base md:text-lg text-stone-600 leading-relaxed about-stagger-item">
                  Novaforma a ete fondee en 2012 par trois passionnes de la formation professionnelle, convaincus que l&apos;acces a des competences de qualite est le meilleur levier d&apos;insertion et de reussite.
                </p>
                <p className="text-base md:text-lg text-stone-600 leading-relaxed about-stagger-item">
                  Aujourd&apos;hui, nous sommes l&apos;un des centres de formation professionnelle les plus reconnus de France, avec plus de 5 000 stagiaires formes chaque annee dans 8 domaines d&apos;excellence.
                </p>
                <p className="text-base md:text-lg text-stone-600 leading-relaxed about-stagger-item">
                  Notre mission est simple : offrir a chaque apprenant une formation pratique, certifiante et reconnue, qui lui permette de transformer sa carriere et de trouver sa place dans le monde professionnel.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="about-reveal">
              <img
                src="/campus.jpg"
                alt="Campus Novaforma"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
              <p className="text-sm text-stone-500 text-center mt-3">
                Notre campus principal — Paris 15e
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Section 3: Values ═══════════ */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center about-reveal">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Nos valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3">
              Ce qui nous anime au quotidien
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 about-stagger">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="about-stagger-item bg-white rounded-xl p-8 text-center border border-stone-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${valueIconBg[v.color]}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mt-4">{v.title}</h3>
                  <p className="text-base text-stone-600 mt-2">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ Section 4: Qualiopi Certification ═══════════ */}
      <section className="py-20 lg:py-[120px] bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center about-reveal">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Certification Qualiopi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3">
              Qualiopi : la certification qualite de l&apos;Etat
            </h2>
          </div>

          <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-16 mt-12 items-start">
            {/* Left: badge + info */}
            <div className="about-reveal flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-40 h-40 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-20 h-20 text-emerald-600" />
              </div>
              <div className="mt-6 space-y-2">
                <p className="font-mono text-base text-stone-700">
                  Numero de declaration : 11 75 48 369
                </p>
                <p className="text-sm text-stone-600">
                  Certifie sur les 7 criteres du referentiel Qualiopi
                </p>
                <p className="text-sm text-stone-500">
                  Date de certification : 15 mars 2024
                </p>
                <p className="text-sm text-stone-500">
                  Prochain audit : mars 2027
                </p>
              </div>
              <a
                href="https://certifications-qualiopi.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Verifier notre certification
              </a>
            </div>

            {/* Right: 7 criteria */}
            <div className="space-y-4 about-stagger">
              {criteria.map((c) => (
                <div
                  key={c.title}
                  className="about-stagger-item flex gap-4 p-4 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900">{c.title}</p>
                    <p className="text-sm text-stone-600 mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Section 5: Team ═══════════ */}
      <section className="py-20 lg:py-[120px] bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center about-reveal">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Notre equipe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3">
              Des experts passionnes a votre service
            </h2>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
              Formateurs, conseillers pedagogiques, equipe administrative : plus de 60 professionnels vous accompagnent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 about-stagger">
            {team.map((member) => (
              <div
                key={member.name}
                className="about-stagger-item bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-[280px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-stone-900">{member.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mt-0.5">{member.role}</p>
                  <p className="text-sm text-stone-600 mt-2 line-clamp-3">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColorMap[tag] || 'bg-stone-100 text-stone-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Section 6: Stats ═══════════ */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 about-stagger">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="about-stagger-item bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center border border-white/10"
                >
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl md:text-4xl font-mono font-bold text-white">
                    {s.value}
                  </p>
                  <p className="text-base text-white/70 mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ Section 7: CTA ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-20 text-center about-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
            Vous souhaitez en savoir plus sur Novaforma ?
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Notre equipe repond a toutes vos questions du lundi au vendredi, 9h-18h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              asChild
              className="px-8 py-4 h-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-base"
            >
              <a href="#/contact">Nous contacter</a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="px-8 py-4 h-auto border-[1.5px] border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-full text-base"
            >
              <a href="tel:0123456789" className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Appeler le 01 23 45 67 89
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

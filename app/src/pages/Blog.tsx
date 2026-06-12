import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogPosts as existingPosts } from '@/data/blog';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────── extended blog data ─────────────────────── */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
}

const allPosts: BlogPost[] = [
  ...existingPosts,
  {
    id: '4',
    slug: 'guide-complet-formation-cpf-2026',
    title: 'Guide complet 2026 : choisir une formation professionnelle eligible CPF',
    excerpt: 'Le Compte Personnel de Formation a change la donne pour des millions de Francais. Voici comment bien choisir votre formation et maximiser votre financement en 2026.',
    tag: 'Reconversion',
    date: '20 janvier 2026',
    readTime: '10 min',
    image: '/hero-main.jpg',
  },
  {
    id: '5',
    slug: '10-metiers-digital-recherches-2026',
    title: 'Les 10 metiers du digital les plus recherches en 2026',
    excerpt: 'Developpeur, data analyst, UX designer : notre panorama des metiers tech qui recrutent le plus cette annee.',
    tag: 'Metiers',
    date: '18 janv. 2026',
    readTime: '6 min',
    image: '/formation-digital.jpg',
  },
  {
    id: '6',
    slug: 'reconversion-apres-40-ans',
    title: 'Reconversion apres 40 ans : il n\'est jamais trop tard',
    excerpt: 'Temoignages et conseils de professionnels qui ont reussi leur reconversion apres 40 ans.',
    tag: 'Conseils carriere',
    date: '15 janv. 2026',
    readTime: '8 min',
    image: '/formation-management.jpg',
  },
  {
    id: '7',
    slug: 'cpf-opco-region-cumuler-financements',
    title: 'CPF, OPCO, Region : comment cumuler les financements',
    excerpt: 'Guide pratique pour maximiser vos aides et financer votre formation a 100%.',
    tag: 'Financement',
    date: '12 janv. 2026',
    readTime: '7 min',
    image: '/classroom.jpg',
  },
  {
    id: '8',
    slug: 'parcours-julien-vente-developpement-web',
    title: 'De la vente au developpement web : le parcours de Julien',
    excerpt: 'A 35 ans, Julien a tout lache pour devenir developpeur. Retour sur 6 mois intenses.',
    tag: 'Temoignages',
    date: '10 janv. 2026',
    readTime: '5 min',
    image: '/formation-digital.jpg',
  },
  {
    id: '9',
    slug: 'qualiopi-2026-changements',
    title: 'Qualiopi 2026 : ce qui change dans la certification qualite',
    excerpt: 'Nouvelles exigences, audit renforce : tout comprendre sur l\'evolution de Qualiopi cette annee.',
    tag: 'Actualites',
    date: '8 janv. 2026',
    readTime: '6 min',
    image: '/formation-management.jpg',
  },
  {
    id: '10',
    slug: 'negocier-formation-employeur',
    title: 'Comment negocier une formation avec votre employeur',
    excerpt: 'Conseils pratiques pour obtenir l\'accord de votre employeur et le financement OPCO.',
    tag: 'Conseils carriere',
    date: '5 janv. 2026',
    readTime: '5 min',
    image: '/campus.jpg',
  },
  {
    id: '11',
    slug: 'histoire-sarah-community-manager',
    title: 'J\'ai change de vie grace au CPF : l\'histoire de Sarah',
    excerpt: 'Sarah, 28 ans, etait serveuse. Aujourd\'hui elle est community manager grace a sa formation CPF.',
    tag: 'Temoignages',
    date: '3 janv. 2026',
    readTime: '4 min',
    image: '/testimonial-1.jpg',
  },
  {
    id: '12',
    slug: 'data-analyst-vs-data-scientist',
    title: 'Data analyst vs Data scientist : quel metier choisir ?',
    excerpt: 'On vous explique les differences entre ces deux metiers de la data et comment s\'y former.',
    tag: 'Metiers',
    date: '30 dec. 2025',
    readTime: '7 min',
    image: '/formation-digital.jpg',
  },
  {
    id: '13',
    slug: 'pole-emploi-formation-guide-2026',
    title: 'Pole emploi et formation : le guide complet 2026',
    excerpt: 'Tout savoir sur les AIF, les formations remunerees et l\'accompagnement Pole emploi.',
    tag: 'Financement',
    date: '28 dec. 2025',
    readTime: '9 min',
    image: '/formation-management.jpg',
  },
];

const categories = ['Tous', 'Conseils carriere', 'Financement', 'Metiers', 'Temoignages', 'Actualites', 'Qualiopi', 'Reconversion'];

const tagColors: Record<string, string> = {
  'Conseils carriere': 'bg-blue-100 text-blue-700',
  'Financement': 'bg-emerald-100 text-emerald-700',
  'Metiers': 'bg-purple-100 text-purple-700',
  'Temoignages': 'bg-orange-100 text-orange-700',
  'Actualites': 'bg-cyan-100 text-cyan-700',
  'Qualiopi': 'bg-green-100 text-green-700',
  'Reconversion': 'bg-indigo-100 text-indigo-700',
};

const POSTS_PER_PAGE = 9;

/* ─────────────────────── component ─────────────────────── */

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);

  /* Filter posts */
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Tous') return allPosts;
    return allPosts.filter((p) => p.tag === activeCategory);
  }, [activeCategory]);

  /* Pagination */
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const featuredPost = allPosts.find((p) => p.id === '4') || allPosts[0];

  /* Reset page on category change */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  /* GSAP animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.blog-reveal').forEach((el) => {
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
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div ref={pageRef}>
      {/* ═══════════ Section 1: Hero Header ═══════════ */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <nav className="text-sm text-white/70 mb-4 blog-reveal">
            <a href="#/" className="hover:text-white transition-colors">Accueil</a>
            <span className="mx-2">&gt;</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight blog-reveal">
            Conseils, actus et temoignages
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl blog-reveal">
            Toute l&apos;actualite de la formation professionnelle, des conseils carriere et des histoires de reconversion reussies.
          </p>
        </div>
      </section>

      {/* ═══════════ Section 2: Featured Article ═══════════ */}
      <section className="py-12 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 blog-reveal">
            <div className="grid lg:grid-cols-[55%_45%]">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span
                  className={`inline-block self-start text-xs font-semibold px-3 py-1 rounded-full ${tagColors[featuredPost.tag] || 'bg-stone-100 text-stone-700'}`}
                >
                  {featuredPost.tag}
                </span>
                <p className="text-sm text-stone-500 mt-3">{featuredPost.date}</p>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2 leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-base text-stone-600 mt-3">{featuredPost.excerpt}</p>
                <a
                  href={`#/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Lire l&apos;article
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Section 3: Category Filters ═══════════ */}
      <section className="pb-6 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  'flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ' +
                  (activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50')
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Section 4: Article Grid ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 blog-reveal"
                  >
                    <div className="h-[200px] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[post.tag] || 'bg-stone-100 text-stone-700'}`}
                        >
                          {post.tag}
                        </span>
                        <span className="text-xs text-stone-500">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 mt-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        <a href={`#/blog/${post.slug}`}>{post.title}</a>
                      </h3>
                      <p className="text-sm text-stone-600 mt-2 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                        <a
                          href={`#/blog/${post.slug}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Lire la suite
                        </a>
                        <span className="flex items-center gap-1 text-xs text-stone-500">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 blog-reveal">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Page precedente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={
                        'w-10 h-10 rounded-lg text-sm font-semibold transition-colors ' +
                        (currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-stone-200 text-stone-600 hover:bg-stone-50')
                      }
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Page suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Tag className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="mt-4 text-lg text-stone-600">Aucun article dans cette categorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ Section 5: Newsletter CTA ═══════════ */}
      <section className="py-16 bg-[#1E3A5F]">
        <div className="max-w-2xl mx-auto px-6 lg:px-20 text-center blog-reveal">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Restez informe(e)
          </h3>
          <p className="mt-3 text-base text-white/80">
            Recevez nos conseils carriere et nos offres de formation directement dans votre boite mail.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 px-6 rounded-full bg-white border-0 text-stone-900 placeholder:text-stone-400 flex-1"
            />
            <Button
              type="submit"
              className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg transition-all hover:scale-[1.02]"
            >
              S&apos;inscrire
            </Button>
          </form>
          <p className="mt-3 text-xs text-white/50">
            Pas de spam. Desinscription a tout moment.
          </p>
        </div>
      </section>
    </div>
  );
}

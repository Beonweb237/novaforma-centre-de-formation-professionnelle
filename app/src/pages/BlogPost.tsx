import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Calendar, User, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts as existingPosts } from '@/data/blog';

/* ─── extended blog data ─── */
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  author?: string;
  authorRole?: string;
}

const allPosts: BlogPost[] = [
  ...existingPosts,
  {
    id: '4', slug: 'guide-complet-formation-cpf-2026', title: 'Guide complet 2026 : choisir une formation professionnelle eligible CPF', excerpt: 'Le Compte Personnel de Formation a change la donne pour des millions de Francais.', tag: 'Reconversion', date: '20 janvier 2026', readTime: '10 min', image: '/hero-main.jpg', author: 'Sophie Moreau', authorRole: 'Conseillere en formation',
    content: `## Le CPF en 2026 : mode d'emploi

Le Compte Personnel de Formation a ete profondement transforme. Voici comment en tirer le meilleur parti.

## Qu'est-ce qui change en 2026 ?

Le CPF est desormais accessible via l'application mobile FranceConnect+. Les demarches sont simplifiees et le catalogue s'est enrichi de plus de 15 000 formations certifiantes.

## Comment choisir sa formation ?

1. Verifiez votre solde sur MonCompteFormation.gouv.fr
2. Recherchez les formations avec le label Qualiopi
3. Comparez les avis et les taux d'insertion professionnelle
4. Privilegiez les titres RNCP de niveau 5 et plus

## Les formations les plus demandees

| Secteur | Salaire median | Taux d'emploi |
|---------|---------------|---------------|
| Developpement web | 38 000 € | 92 % |
| Data science | 45 000 € | 89 % |
| Cybersecurite | 42 000 € | 95 % |
| Design UX/UI | 35 000 € | 87 % |

## Conclusion

Le CPF est un formidable levier pour financer votre reconversion. Prenez le temps de bien choisir votre formation et n'hesitez pas a solliciter un conseiller en evolution professionnelle.` },
  {
    id: '5', slug: '10-metiers-digital-recherches-2026', title: 'Les 10 metiers du digital les plus recherches en 2026', excerpt: 'Developpeur, data analyst, UX designer : panorama des metiers tech qui recrutent.', tag: 'Metiers', date: '18 janv. 2026', readTime: '6 min', image: '/formation-digital.jpg',
    content: `## Le top 10 des metiers du digital

Le numerique continue de creer des emplois a un rythme soutenu. Voici les 10 metiers qui recrutent le plus en 2026.

1. **Developpeur full-stack** - 45 000 offres
2. **Data analyst** - 32 000 offres
3. **Chef de projet digital** - 28 000 offres
4. **Expert cybersecurite** - 25 000 offres
5. **UX/UI Designer** - 22 000 offres
6. **DevOps** - 20 000 offres
7. **Product Manager** - 18 000 offres
8. **Consultant SEO/SEA** - 15 000 offres
9. **Data Scientist** - 14 000 offres
10. **Cloud architect** - 12 000 offres

## Comment se former ?

La plupart de ces metiers sont accessibles via des formations courtes (6 a 12 mois) finançables par le CPF.` },
  {
    id: '6', slug: 'reconversion-apres-40-ans', title: 'Reconversion apres 40 ans : il n\'est jamais trop tard', excerpt: 'Temoignages et conseils de professionnels qui ont reussi leur reconversion.', tag: 'Conseils carriere', date: '15 janv. 2026', readTime: '8 min', image: '/formation-management.jpg',
    content: `## Il n'y a pas d'age pour changer de vie

Contrairement aux idees recues, la reconversion apres 40 ans est non seulement possible, mais de plus en plus frequente.

## Pourquoi se reconvertir a 40 ans ?

- Donner du sens a sa carriere
- S'adapter aux evolutions du marche du travail
- Realiser un reve longtemps repousse

## Les cles de la reussite

1. Realiser un bilan de competences approfondi
2. Identifier les secteurs porteurs
3. Mobiliser tous les financements disponibles (CPF, OPCO, Region)
4. S'entourer de professionnels pour l'accompagnement

## Temoignage de Philippe, 45 ans

"Apres 20 ans dans la banque, j'ai tout quitte pour devenir formateur. J'ai utilise mon CPF et le conge de reconversion. Aujourd'hui, je suis epanoui et je ne regrette rien."` },
  { id: '7', slug: 'cpf-opco-region-cumuler-financements', title: 'CPF, OPCO, Region : comment cumuler les financements', excerpt: 'Guide pratique pour maximiser vos aides et financer votre formation a 100%.', tag: 'Financement', date: '12 janv. 2026', readTime: '7 min', image: '/classroom.jpg', content: `Guide detaille sur le cumul des financements pour votre formation professionnelle.` },
  { id: '8', slug: 'parcours-julien-vente-developpement-web', title: 'De la vente au developpement web : le parcours de Julien', excerpt: 'A 35 ans, Julien a tout lache pour devenir developpeur.', tag: 'Temoignages', date: '10 janv. 2026', readTime: '5 min', image: '/formation-digital.jpg', content: `Temoignage complet de Julien sur sa reconversion de la vente au developpement web.` },
  { id: '9', slug: 'qualiopi-2026-changements', title: 'Qualiopi 2026 : ce qui change dans la certification qualite', excerpt: 'Nouvelles exigences, audit renforce sur la certification.', tag: 'Actualites', date: '8 janv. 2026', readTime: '6 min', image: '/formation-management.jpg', content: `Analyse des evolutions de la certification Qualiopi en 2026.` },
  { id: '10', slug: 'negocier-formation-employeur', title: 'Comment negocier une formation avec votre employeur', excerpt: 'Conseils pour obtenir l\'accord de votre employeur.', tag: 'Conseils carriere', date: '5 janv. 2026', readTime: '5 min', image: '/campus.jpg', content: `Guide pratique pour convaincre votre employeur de financer votre formation.` },
  { id: '11', slug: 'histoire-sarah-community-manager', title: 'J\'ai change de vie grace au CPF : l\'histoire de Sarah', excerpt: 'Sarah, 28 ans, etait serveuse. Aujourd\'hui community manager.', tag: 'Temoignages', date: '3 janv. 2026', readTime: '4 min', image: '/testimonial-1.jpg', content: `Temoignage de Sarah sur sa reconversion de serveuse a community manager.` },
  { id: '12', slug: 'data-analyst-vs-data-scientist', title: 'Data analyst vs Data scientist : quel metier choisir ?', excerpt: 'Differences entre ces deux metiers de la data et comment s\'y former.', tag: 'Metiers', date: '30 dec. 2025', readTime: '7 min', image: '/formation-digital.jpg', content: `Comparatif detaille entre les metiers de data analyst et data scientist.` },
  { id: '13', slug: 'pole-emploi-formation-guide-2026', title: 'Pole emploi et formation : le guide complet 2026', excerpt: 'Tout savoir sur les AIF, les formations remunerees.', tag: 'Financement', date: '28 dec. 2025', readTime: '9 min', image: '/formation-management.jpg', content: `Guide complet sur les aides de Pole emploi pour financer votre formation en 2026.` },
];

const tagColors: Record<string, string> = {
  'Conseils carriere': 'bg-blue-100 text-blue-700',
  'Financement': 'bg-emerald-100 text-emerald-700',
  'Metiers': 'bg-purple-100 text-purple-700',
  'Temoignages': 'bg-orange-100 text-orange-700',
  'Actualites': 'bg-cyan-100 text-cyan-700',
  'Qualiopi': 'bg-green-100 text-green-700',
  'Reconversion': 'bg-indigo-100 text-indigo-700',
};

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-stone-900 mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold text-stone-800 mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('| ')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('| ')) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, elements.length));
      continue;
    }

    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg pl-5 py-3 my-6 text-stone-700 italic">
          {line.replace('> ', '')}
        </blockquote>
      );
      i++;
      continue;
    }

    if (line.match(/^\d+\.\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-stone-700">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-2 my-4 text-stone-700">
          {listItems.map((item, idx) => (
            <li key={idx}>{item.replace(/\*\*(.*?)\*\*/g, '$1')}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    elements.push(
      <p key={i} className="text-stone-700 leading-relaxed mb-4">
        {line}
      </p>
    );
    i++;
  }

  return elements;
}

function renderTable(lines: string[], key: number) {
  if (lines.length < 1) return null;
  const headers = lines[0].split('|').filter(Boolean).map(h => h.trim());
  const rows = lines.slice(2).map(l => l.split('|').filter(Boolean).map(c => c.trim()));
  return (
    <div key={key} className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-stone-100">
            {headers.map((h, i) => (
              <th key={i} className="border border-stone-200 px-4 py-2 text-left text-sm font-semibold text-stone-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="even:bg-stone-50">
              {row.map((cell, ci) => (
                <td key={ci} className="border border-stone-200 px-4 py-2 text-sm text-stone-600">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Article introuvable</h1>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700 font-semibold">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.tag === post.tag)
    .slice(0, 2);

  return (
    <div>
      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white mb-4`}>
            {post.tag}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/70">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
                {post.authorRole && <span className="text-white/50">- {post.authorRole}</span>}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} de lecture
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12 bg-[#F5F5F0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-20">
          <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-12">
            {/* Featured image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-stone-400" />
                <span className="text-sm text-stone-500">{post.tag}</span>
              </div>
              <Button
                variant="outline"
                className="border-stone-200 text-stone-600 hover:bg-stone-50"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-20">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Articles similaires</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColors[rp.tag] || 'bg-stone-100 text-stone-700'}`}>
                      {rp.tag}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 mt-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {rp.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-stone-500">
                      <Clock className="w-3 h-3" />
                      {rp.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Newsletter */}
      <section className="py-16 bg-[#1E3A5F]">
        <div className="max-w-2xl mx-auto px-6 lg:px-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Restez informe(e)
          </h3>
          <p className="mt-3 text-base text-white/80">
            Recevez nos conseils carriere et nos offres de formation directement dans votre boite mail.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg transition-all hover:scale-[1.02]"
          >
            Nous contacter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

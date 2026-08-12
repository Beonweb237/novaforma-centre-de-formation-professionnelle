import { Clock, Users, BarChart, CheckCircle } from 'lucide-react';
import type { Training } from '../data/trainings';

interface TrainingCardProps {
  training: Training;
  index?: number;
}

function formatPrice(n: number): string {
  return n.toLocaleString('fr-FR') + ' EUR';
}

export default function TrainingCard({ training, index = 0 }: TrainingCardProps) {
  return (
    <a
      href={`#/formation/${training.slug}`}
      className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={training.image}
          alt={training.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Domain Badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide backdrop-blur-sm"
          style={{
            backgroundColor: training.domainColor + '60',
            color: '#FFFFFF',
          }}
        >
          {training.domain}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-bold text-stone-900 leading-snug mb-2 line-clamp-2">
          {training.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-stone-500 leading-relaxed mb-4 line-clamp-3 flex-1">
          {training.description}
        </p>

        {/* Meta Row */}
        <div className="flex flex-wrap gap-3 text-xs text-stone-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {training.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {training.format}
          </span>
          <span className="flex items-center gap-1">
            <BarChart className="w-3.5 h-3.5" />
            {training.level}
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="font-mono text-xl font-bold text-stone-900">
            {formatPrice(training.price)}
          </span>
          <span className="text-xs text-stone-400 ml-1">TTC</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          {training.cpfEligible && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Eligible CPF
            </span>
          )}
          <span className="text-sm font-semibold text-blue-600 ml-auto group-hover:underline">
            En savoir plus
          </span>
        </div>
      </div>
    </a>
  );
}

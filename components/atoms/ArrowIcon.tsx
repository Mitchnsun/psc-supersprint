import { cn } from '@/lib/utils';

const ArrowIcon = ({ down }: { down: boolean }) => (
  <button
    type="button"
    aria-disabled="false"
    aria-label="Détails des résultats"
    aria-expanded={down}
    className={cn('m-0 p-0 border-0 bg-transparent w-5 h-5 transition-transform duration-150', {
      'rotate-0': down,
      '-rotate-90': !down,
    })}
  >
    <svg className="fill-gray-dark" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  </button>
);

export default ArrowIcon;

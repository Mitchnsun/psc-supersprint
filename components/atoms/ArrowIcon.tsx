import COLORS from '@/styles/colors';

const ArrowIcon = ({ down }: { down: boolean }) => (
  <button
    type="button"
    aria-disabled="false"
    aria-label="Détails des résultats"
    aria-expanded={down}
    className="m-0 p-0 border-0 bg-transparent w-5 h-5 transition-transform duration-150"
    style={{
      transform: down ? 'rotate(0deg)' : 'rotate(-90deg)',
    }}
  >
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation" fill={COLORS.GRAY_DARK}>
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  </button>
);

export default ArrowIcon;

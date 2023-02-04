import { styled } from '@mui/material/styles';
import COLORS from '@/styles/colors';

const Button = styled('button')`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  width: 20px;
  height: 20px;
  transform: rotate(${(props) => (props['aria-expanded'] ? 0 : '-90deg')});
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const ArrowIcon = ({ down }: { down: boolean }) => (
  <Button type="button" aria-disabled="false" aria-label="Détails des résultats" aria-expanded={down}>
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation" fill={COLORS.GRAY_DARK}>
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  </Button>
);

export default ArrowIcon;

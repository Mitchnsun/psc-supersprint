import { PropsWithChildren, ElementType, createElement } from 'react';
import COLORS from '@/styles/colors';
import { cn } from '@/lib/utils';

const Title = ({
  hLevel = 'h1',
  children,
  className,
}: PropsWithChildren<{ hLevel?: ElementType; className?: string }>) =>
  createElement(
    hLevel,
    {
      className: cn('text-2xl p-[10px_15px]', className),
      style: {
        color: COLORS.WHITE,
        backgroundColor: COLORS.SECONDARY,
        fontFamily: 'FontBold',
      },
    },
    children,
  );

export default Title;

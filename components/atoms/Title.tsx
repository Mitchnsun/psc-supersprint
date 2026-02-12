import { PropsWithChildren, ElementType, createElement } from 'react';
import { cn } from '@/lib/utils';

const Title = ({
  hLevel = 'h1',
  children,
  className,
}: PropsWithChildren<{ hLevel?: ElementType; className?: string }>) =>
  createElement(
    hLevel,
    {
      className: cn('text-4xl py-3 px-4 text-white bg-secondary font-bold', className),
    },
    children,
  );

export default Title;

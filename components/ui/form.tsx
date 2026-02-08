import * as React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Label } from './label';
import { cn } from '@/lib/utils';

// FormField component that wraps Controller from react-hook-form
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

// FormItem - wrapper for form field items
export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('space-y-2', className)} {...props} />;
  },
);
FormItem.displayName = 'FormItem';

// FormLabel - label for form fields
export const FormLabel = React.forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
  ({ className, ...props }, ref) => {
    return <Label ref={ref} className={cn(className)} {...props} />;
  },
);
FormLabel.displayName = 'FormLabel';

// FormMessage - error message display
export const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    if (!children) {
      return null;
    }

    return (
      <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props}>
        {children}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

import { withVariants } from '@udecode/cn';
import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full rounded-md bg-transparent text-sm file:border-0 file:bg-white file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:file:bg-stone-950 dark:placeholder:text-stone-400',
  {
    variants: {
      variant: {
        default:
          'border border-stone-200 ring-offset-white focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 dark:border-stone-800 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300',
        ghost: 'border-none focus-visible:ring-transparent',
      },
      h: {
        sm: 'h-9 px-3 py-2',
        md: 'h-10 px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      h: 'md',
    },
  }
);

export const Input = withVariants('input', inputVariants, ['variant', 'h']);

'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn, withRef } from '@udecode/cn'

import { Icons } from '@/components/icons'

export const Checkbox = withRef<typeof CheckboxPrimitive.Root>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-stone-200 border-stone-900 bg-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-stone-900 data-[state=checked]:text-stone-50 dark:border-stone-800 dark:border-stone-50 dark:bg-stone-950 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300 dark:data-[state=checked]:bg-stone-50 dark:data-[state=checked]:text-stone-900',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Icons.check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
)

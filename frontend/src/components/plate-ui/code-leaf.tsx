import React from 'react'
import { PlateLeaf, PlateLeafProps } from '@udecode/plate-common'

import { cn } from '@/lib/utils'

export function CodeLeaf({ className, children, ...props }: PlateLeafProps) {
  return (
    <PlateLeaf
      asChild
      className={cn(
        'whitespace-pre-wrap',
        'rounded-md bg-stone-100 px-[0.3em] py-[0.2em] font-mono text-sm dark:bg-stone-800',
        className,
      )}
      {...props}
    >
      <code>{children}</code>
    </PlateLeaf>
  )
}

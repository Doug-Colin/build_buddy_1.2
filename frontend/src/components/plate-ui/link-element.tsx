import React from 'react'
import { cn, withRef } from '@udecode/cn'
import { PlateElement, useElement } from '@udecode/plate-common'
import { TLinkElement, useLink } from '@udecode/plate-link'

export const LinkElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const element = useElement<TLinkElement>()
    const { props: linkProps } = useLink({ element })

    return (
      <PlateElement
        ref={ref}
        asChild
        className={cn(
          'font-medium text-stone-900 underline decoration-primary underline-offset-4 dark:text-stone-50',
          className,
        )}
        {...(linkProps as any)}
        {...props}
      >
        <a>{children}</a>
      </PlateElement>
    )
  },
)

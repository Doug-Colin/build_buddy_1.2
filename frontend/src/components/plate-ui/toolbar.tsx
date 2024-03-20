'use client'

import * as React from 'react'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import { cn, withCn, withRef, withVariants } from '@udecode/cn'
import { cva, VariantProps } from 'class-variance-authority'

import { Icons } from '@/components/icons'

import { Separator } from './separator'
import { withTooltip } from './tooltip'

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'relative flex select-none items-center gap-1 bg-white dark:bg-stone-950',
)

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  'flex items-center',
)

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  'font-medium underline underline-offset-4',
)

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  'my-1 w-[1px] shrink-0 bg-stone-200 dark:bg-stone-800',
)

const toolbarButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300',
    '[&_svg:not([data-icon])]:h-5 [&_svg:not([data-icon])]:w-5',
  ),
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:bg-stone-100 hover:text-stone-500 aria-checked:bg-stone-100 aria-checked:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-400 dark:aria-checked:bg-stone-800 dark:aria-checked:text-stone-50',
        outline:
          'border border-stone-200 bg-transparent hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:hover:bg-stone-800 dark:hover:text-stone-50',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
)

const ToolbarButton = withTooltip(
  React.forwardRef<
    React.ElementRef<typeof ToolbarToggleItem>,
    Omit<
      React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
      'asChild' | 'value'
    > &
      VariantProps<typeof toolbarButtonVariants> & {
        pressed?: boolean
        isDropdown?: boolean
      }
  >(
    (
      { className, variant, size, isDropdown, children, pressed, ...props },
      ref,
    ) => {
      return typeof pressed === 'boolean' ? (
        <ToolbarToggleGroup
          type="single"
          value="single"
          disabled={props.disabled}
        >
          <ToolbarToggleItem
            ref={ref}
            className={cn(
              toolbarButtonVariants({
                variant,
                size,
              }),
              isDropdown && 'my-1 justify-between pr-1',
              className,
            )}
            value={pressed ? 'single' : ''}
            {...props}
          >
            {isDropdown ? (
              <>
                <div className="flex flex-1">{children}</div>
                <div>
                  <Icons.arrowDown className="ml-0.5 h-4 w-4" data-icon />
                </div>
              </>
            ) : (
              children
            )}
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ToolbarPrimitive.Button
          ref={ref}
          className={cn(
            toolbarButtonVariants({
              variant,
              size,
            }),
            isDropdown && 'pr-1',
            className,
          )}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      )
    },
  ),
)
ToolbarButton.displayName = 'ToolbarButton'
export { ToolbarButton }

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toolbarButtonVariants,
  ['variant', 'size'],
)

export const ToolbarGroup = withRef<
  'div',
  {
    noSeparator?: boolean
  }
>(({ className, children, noSeparator }, ref) => {
  const childArr = React.Children.map(children, (c) => c)
  if (!childArr || childArr.length === 0) return null

  return (
    <div ref={ref} className={cn('flex', className)}>
      {!noSeparator && (
        <div className="h-full py-1">
          <Separator orientation="vertical" />
        </div>
      )}

      <div className="mx-1 flex items-center gap-1">{children}</div>
    </div>
  )
})

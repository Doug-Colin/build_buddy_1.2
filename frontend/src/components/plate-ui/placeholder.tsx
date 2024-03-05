import React from 'react'
import { cn } from '@udecode/cn'
import {
  createNodeHOC,
  createNodesHOC,
  PlaceholderProps,
  usePlaceholderState,
} from '@udecode/plate-common'
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading'

import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

export const Placeholder = (props: PlaceholderProps) => {
  const { children, placeholder, nodeProps } = props

  const { enabled } = usePlaceholderState(props)

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            'before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]',
        ),
        placeholder,
      },
    })
  })
}

export const withPlaceholder = createNodeHOC(Placeholder)
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder)

export const withPlaceholders = (components: any) =>
  withPlaceholdersPrimitive(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder:
        'Type here to start a note (click above to change text size).',
      hideOnBlur: true,
      query: {
        maxLevel: 1,
      },
    },
    {
      key: ELEMENT_H1,
      placeholder: 'Heading',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_H2,
      placeholder: 'Smaller Heading',
      hideOnBlur: false,
    },
    {
      key: ELEMENT_H3,
      placeholder: 'Smallest Heading',
      hideOnBlur: false,
    },
  ])

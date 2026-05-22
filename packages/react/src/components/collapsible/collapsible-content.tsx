'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContentBaseProps extends PolymorphicProps {}
export interface CollapsibleContentProps extends HTMLProps<'div'>, CollapsibleContentBaseProps {}

export const CollapsibleContent = ({ ref, ...props }: CollapsibleContentProps) => {
  const collapsible = useCollapsibleContext()

  if (collapsible.isUnmounted) {
    return null
  }

  const mergedProps = mergeProps(collapsible.getContentProps(), props)
  return <ark.div {...mergedProps} ref={ref} />
}

CollapsibleContent.displayName = 'CollapsibleContent'

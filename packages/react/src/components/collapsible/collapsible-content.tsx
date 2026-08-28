'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { CollapsibleGate } from './collapsible-gate.tsx'
import { useCollapsibleContext } from './use-collapsible-context.ts'

export interface CollapsibleContentBaseProps extends PolymorphicProps {}
export interface CollapsibleContentProps extends HTMLProps<'div'>, CollapsibleContentBaseProps {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>((props, ref) => {
  const collapsible = useCollapsibleContext()

  const mergedProps = mergeProps(
    collapsible.getContentProps(),
    collapsible.hideMode === 'activity' ? { hidden: false } : {},
    props,
  )

  return (
    <CollapsibleGate collapsible={collapsible}>
      <ark.div {...mergedProps} ref={ref} />
    </CollapsibleGate>
  )
})

CollapsibleContent.displayName = 'CollapsibleContent'

'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleTriggerBaseProps extends PolymorphicProps {}
export interface CollapsibleTriggerProps extends HTMLProps<'button'>, CollapsibleTriggerBaseProps {}

export const CollapsibleTrigger = ({ ref, ...props }: CollapsibleTriggerProps) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(collapsible.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

CollapsibleTrigger.displayName = 'CollapsibleTrigger'

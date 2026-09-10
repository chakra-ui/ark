'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import type { TriggerState } from '@zag-js/collapsible'

export interface CollapsibleTriggerState extends TriggerState {}

export interface CollapsibleTriggerBaseProps extends PolymorphicProps<CollapsibleTriggerState> {}
export interface CollapsibleTriggerProps extends HTMLProps<'button'>, CollapsibleTriggerBaseProps {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>((props, ref) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(collapsible.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} state={collapsible.getTriggerState()} />
})

CollapsibleTrigger.displayName = 'CollapsibleTrigger'

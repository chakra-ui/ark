'use client'

import { mergeProps } from '@zag-js/react'
import type { TriggerProps, TriggerState } from '@zag-js/tabs'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTabsContext } from './use-tabs-context.ts'

export interface TabTriggerState extends TriggerState {}

export interface TabTriggerBaseProps extends TriggerProps, PolymorphicProps<TabTriggerState> {}
export interface TabTriggerProps extends Assign<HTMLProps<'button'>, TabTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>((props, ref) => {
  const [tabProps, localProps] = splitTriggerProps(props, ['disabled', 'value'])
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getTriggerProps(tabProps), localProps)

  return <ark.button {...mergedProps} ref={ref} state={tabs.getTriggerState(tabProps)} />
})

TabTrigger.displayName = 'TabTrigger'

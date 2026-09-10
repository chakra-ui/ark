'use client'

import type { TriggerProps, TriggerState } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxTriggerState extends TriggerState {}

export interface ComboboxTriggerBaseProps extends TriggerProps, PolymorphicProps<ComboboxTriggerState> {}
export interface ComboboxTriggerProps extends HTMLProps<'button'>, ComboboxTriggerBaseProps {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['focusable'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} state={combobox.getTriggerState(triggerProps)} />
})

ComboboxTrigger.displayName = 'ComboboxTrigger'

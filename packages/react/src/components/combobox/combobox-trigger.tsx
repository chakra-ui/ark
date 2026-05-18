'use client'

import type { TriggerProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface ComboboxTriggerProps extends HTMLProps<'button'>, ComboboxTriggerBaseProps {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['focusable'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

ComboboxTrigger.displayName = 'ComboboxTrigger'

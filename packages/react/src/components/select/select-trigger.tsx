'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import type { TriggerState } from '@zag-js/select'

export interface SelectTriggerState extends TriggerState {}

export interface SelectTriggerBaseProps extends PolymorphicProps<SelectTriggerState> {}
export interface SelectTriggerProps extends HTMLProps<'button'>, SelectTriggerBaseProps {}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} state={select.getTriggerState()} />
})

SelectTrigger.displayName = 'SelectTrigger'

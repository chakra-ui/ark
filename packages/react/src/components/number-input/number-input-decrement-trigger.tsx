'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import type { DecrementTriggerState } from '@zag-js/number-input'

export interface NumberInputDecrementTriggerState extends DecrementTriggerState {}

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps<NumberInputDecrementTriggerState> {}
export interface NumberInputDecrementTriggerProps extends HTMLProps<'button'>, NumberInputDecrementTriggerBaseProps {}

export const NumberInputDecrementTrigger = forwardRef<HTMLButtonElement, NumberInputDecrementTriggerProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getDecrementTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} state={numberInput.getDecrementTriggerState()} />
  },
)

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'

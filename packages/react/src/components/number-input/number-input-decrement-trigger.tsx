import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export type NumberInputDecrementTriggerBaseProps = {}
export interface NumberInputDecrementTriggerProps
  extends HTMLArkProps<'button'>,
    NumberInputDecrementTriggerBaseProps {}

export const NumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getDecrementTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'

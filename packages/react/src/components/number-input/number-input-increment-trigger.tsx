import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export type NumberInputIncrementTriggerBaseProps = {}
export interface NumberInputIncrementTriggerProps
  extends HTMLArkProps<'button'>,
    NumberInputIncrementTriggerBaseProps {}

export const NumberInputIncrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getIncrementTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputIncrementTrigger.displayName = 'NumberInputIncrementTrigger'

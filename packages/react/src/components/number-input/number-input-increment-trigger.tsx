import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputIncrementTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
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

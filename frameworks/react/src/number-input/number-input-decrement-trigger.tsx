import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputDecrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>((props, ref) => {
  const context = useNumberInputContext()
  const mergedProps = mergeProps(context.decrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'

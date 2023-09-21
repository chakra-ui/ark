import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputDecrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>((props, ref) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(api.decrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'

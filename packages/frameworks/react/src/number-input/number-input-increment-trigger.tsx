import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputIncrementTriggerProps extends HTMLArkProps<'button'> {}

export const NumberInputIncrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>((props, ref) => {
  const api = useNumberInputContext()
  const mergedProps = mergeProps(api.incrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputIncrementTrigger.displayName = 'NumberInputIncrementTrigger'

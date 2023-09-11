import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = HtmlArkProps<'button'>

export const NumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>((props, ref) => {
  const { decrementTriggerProps } = useNumberInputContext()
  const mergedProps = mergeProps(decrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'

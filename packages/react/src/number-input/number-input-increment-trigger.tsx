import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementTriggerProps = HtmlArkProps<'button'>

export const NumberInputIncrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>((props, ref) => {
  const { incrementTriggerProps } = useNumberInputContext()
  const mergedProps = mergeProps(incrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputIncrementTrigger.displayName = 'NumberInputIncrementTrigger'

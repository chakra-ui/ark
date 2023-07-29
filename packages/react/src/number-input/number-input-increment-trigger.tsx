import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const NumberInputIncrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>((props, ref) => {
  const { incrementTriggerProps } = useNumberInputContext()
  const mergedProps = mergeProps(incrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputIncrementTrigger.displayName = 'NumberInputIncrementTrigger'

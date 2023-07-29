import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const NumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>((props, ref) => {
  const { decrementTriggerProps } = useNumberInputContext()
  const mergedProps = mergeProps(decrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'

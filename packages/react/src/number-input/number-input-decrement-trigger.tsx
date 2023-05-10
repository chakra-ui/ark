import { mergeProps } from '@zag-js/react'
import { type ReactElement } from 'react'
import { ark } from '../factory'
import { forwardRef } from '../forward-ref'
import { useNumberInputContext } from './number-input-context'
export type NumberInputDecrementTriggerProps = { children: ReactElement }

export const NumberInputDecrementTrigger = forwardRef<'button'>((props, ref) => {
  const { decrementTriggerProps } = useNumberInputContext()
  const mergedProps = mergeProps(decrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

import { mergeProps } from '@zag-js/react'
import { type ReactElement } from 'react'
import { ark } from '../factory'
import { forwardRef } from '../forward-ref'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementTriggerProps = { children: ReactElement }

export const NumberInputIncrementTrigger = forwardRef<'button'>((props, ref) => {
  const { incrementTriggerProps } = useNumberInputContext()
  const mergedProps = mergeProps(incrementTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

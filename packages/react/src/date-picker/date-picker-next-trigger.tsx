import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerNextTriggerProps = HTMLArkProps<'button'>

export const DatePickerNextTrigger = forwardRef<'button'>((props, ref) => {
  const { getNextTriggerProps, view } = useDatePickerContext()
  const mergedProps = mergeProps(getNextTriggerProps({ view }), props)

  return <ark.button {...mergedProps} ref={ref} />
})

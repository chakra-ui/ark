import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerClearTriggerProps = HTMLArkProps<'button'>

export const DatePickerClearTrigger = forwardRef<'button'>((props, ref) => {
  const { clearTriggerProps } = useDatePickerContext()
  const mergedProps = mergeProps(clearTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

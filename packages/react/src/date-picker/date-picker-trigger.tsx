import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerTriggerProps = HTMLArkProps<'button'>

export const DatePickerTrigger = forwardRef<'button'>((props, ref) => {
  const { triggerProps } = useDatePickerContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

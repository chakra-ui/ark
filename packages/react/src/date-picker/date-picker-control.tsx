import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerControlProps = HTMLArkProps<'div'>

export const DatePickerControl = forwardRef<'div'>((props, ref) => {
  const { controlProps } = useDatePickerContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

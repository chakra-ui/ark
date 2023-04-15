import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerControlProps = HTMLArkProps<'div'>

export const DatePickerControl = forwardRef<'div', DatePickerControlProps>((props, ref) => {
  const { controlProps } = useDatePickerContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

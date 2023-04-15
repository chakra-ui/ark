import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerContentProps = HTMLArkProps<'div'>

export const DatePickerContent = forwardRef<'div', DatePickerContentProps>((props, ref) => {
  const { contentProps } = useDatePickerContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

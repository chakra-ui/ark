import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerContentProps = HTMLArkProps<'div'>

export const DatePickerContent = forwardRef<'div'>((props, ref) => {
  const { contentProps } = useDatePickerContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

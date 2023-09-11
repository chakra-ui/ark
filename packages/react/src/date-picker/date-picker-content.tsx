import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerContentProps = HtmlArkProps<'div'>

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => {
    const { contentProps } = useDatePickerContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerContent.displayName = 'DatePickerContent'

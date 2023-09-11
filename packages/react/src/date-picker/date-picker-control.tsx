import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerControlProps = HtmlArkProps<'div'>

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>(
  (props, ref) => {
    const { controlProps } = useDatePickerContext()
    const mergedProps = mergeProps(controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerControl.displayName = 'DatePickerControl'

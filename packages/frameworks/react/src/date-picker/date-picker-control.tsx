import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerControlProps = HTMLArkProps<'div'>

export const DatePickerControl = forwardRef<HTMLDivElement, DatePickerControlProps>(
  (props, ref) => {
    const { controlProps } = useDatePickerContext()
    const mergedProps = mergeProps(controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerControl.displayName = 'DatePickerControl'

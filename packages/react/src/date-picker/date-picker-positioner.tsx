import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerPositionerProps = HtmlArkProps<'div'>

export const DatePickerPositioner = forwardRef<HTMLDivElement, DatePickerPositionerProps>(
  (props, ref) => {
    const { positionerProps } = useDatePickerContext()
    const mergedProps = mergeProps(positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerPositioner.displayName = 'DatePickerPositioner'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerContentProps extends HTMLArkProps<'div'> {}

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerContent.displayName = 'DatePickerContent'

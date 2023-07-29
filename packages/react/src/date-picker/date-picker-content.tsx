import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerContentProps = ComponentPropsWithoutRef<typeof ark.div>

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => {
    const { contentProps } = useDatePickerContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerContent.displayName = 'DatePickerContent'

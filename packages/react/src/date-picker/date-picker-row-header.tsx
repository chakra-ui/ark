import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerRowHeaderProps = ComponentPropsWithoutRef<typeof ark.div>

export const DatePickerRowHeader = forwardRef<HTMLDivElement, DatePickerRowHeaderProps>(
  (props, ref) => {
    const { getHeaderProps } = useDatePickerContext()
    const mergedProps = mergeProps(getHeaderProps({ view: 'day' }), props)

    return <ark.div role="row" {...mergedProps} aria-hidden={false} ref={ref} />
  },
)

DatePickerRowHeader.displayName = 'DatePickerRowHeader'

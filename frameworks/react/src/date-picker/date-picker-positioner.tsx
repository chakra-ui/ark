import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerPositionerProps extends HTMLArkProps<'div'> {}

export const DatePickerPositioner = forwardRef<HTMLDivElement, DatePickerPositionerProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const mergedProps = mergeProps(context.positionerProps, props)
    const presenceApi = usePresenceContext()

    if (presenceApi.isUnmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

DatePickerPositioner.displayName = 'DatePickerPositioner'

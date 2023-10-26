import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children' | 'fallback'>> {}

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => {
    const [presenceProps, localProps] = splitPresenceProps(props)
    const api = useDatePickerContext()

    return (
      <Presence present={api.isOpen} {...presenceProps} fallback={<div {...api.contentProps} />}>
        <DatePickerInnerContent ref={ref} {...localProps} />
      </Presence>
    )
  },
)

DatePickerContent.displayName = 'DatePickerContent'

const DatePickerInnerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  function DatePickerInnerContent(props, ref) {
    const api = useDatePickerContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

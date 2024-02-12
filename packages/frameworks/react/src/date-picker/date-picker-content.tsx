import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerContentProps extends HTMLArkProps<'div'> {}

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const presenceApi = usePresenceContext()
    const mergedProps = mergeProps(api.contentProps, presenceApi.getPresenceProps(ref), props)

    if (presenceApi.isUnmounted) {
      return null
    }

    return <ark.div {...mergedProps} />
  },
)

DatePickerContent.displayName = 'DatePickerContent'

import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const DatePickerContent = (props: DatePickerContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps} fallback={<div {...api().contentProps} />}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

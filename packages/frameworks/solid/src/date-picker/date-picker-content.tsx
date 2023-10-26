import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerContentProps = HTMLArkProps<'div'> & PresenceProps

export const DatePickerContent = (props: DatePickerContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

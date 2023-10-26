import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export interface ComboboxContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const ComboboxContent = (props: ComboboxContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useComboboxContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps} fallback={<div {...api().contentProps} />}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

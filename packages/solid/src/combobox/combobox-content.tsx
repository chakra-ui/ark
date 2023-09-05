import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'div'> & PresenceProps

export const ComboboxContent = (props: ComboboxContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useComboboxContext()
  const contentProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...contentProps} />
    </Presence>
  )
}

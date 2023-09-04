import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'
import { ComboboxPresence, type ComboboxPresenceProps } from './comobox-presence'

export type ComboboxContentProps = HTMLArkProps<'div'> & ComboboxPresenceProps

export const ComboboxContent = (props: ComboboxContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const combobox = useComboboxContext()
  const contentProps = mergeProps(() => combobox().contentProps, localProps)

  return (
    <ComboboxPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </ComboboxPresence>
  )
}

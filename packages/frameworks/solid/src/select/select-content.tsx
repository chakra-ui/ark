import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useSelectContext } from './select-context'

export type SelectContentProps = HTMLArkProps<'div'> & PresenceProps

export const SelectContent = (props: SelectContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

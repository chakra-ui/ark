import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useSelectContext } from './select-context'
import { SelectPresence, type SelectPresenceProps } from './select-presence'

export type SelectContentProps = HTMLArkProps<'div'> & SelectPresenceProps

export const SelectContent = (props: SelectContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useSelectContext()
  const contentProps = mergeProps(() => api().contentProps, localProps)

  return (
    <SelectPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </SelectPresence>
  )
}

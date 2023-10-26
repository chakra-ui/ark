import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export interface SelectContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const SelectContent = (props: SelectContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useSelectContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps} fallback={<div {...api().contentProps} />}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

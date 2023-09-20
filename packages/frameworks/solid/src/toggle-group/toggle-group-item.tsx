import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useToggleGroupContext } from './toggle-group-context'

type ItemProps = {
  value: string
  disabled?: boolean
}

export type ToggleGroupItemProps = Assign<HTMLArkProps<'button'>, ItemProps>

export const ToggleGroupItem = (props: ToggleGroupItemProps) => {
  const [toggleProps, restProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useToggleGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(toggleProps), restProps)

  return <ark.button {...mergedProps} />
}

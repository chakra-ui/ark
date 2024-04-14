import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/toggle-group'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { useToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const ToggleGroupItem = (props: ToggleGroupItemProps) => {
  const [toggleProps, restProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useToggleGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(toggleProps), restProps)

  return <ark.button {...mergedProps} />
}

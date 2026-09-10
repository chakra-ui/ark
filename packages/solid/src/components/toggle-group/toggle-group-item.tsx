import { mergeProps } from '@zag-js/solid'
import type { ItemProps, ItemState } from '@zag-js/toggle-group'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useToggleGroupContext } from './use-toggle-group-context.ts'

export interface ToggleGroupItemState extends ItemState {}

export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps<'button', ToggleGroupItemState> {}
export interface ToggleGroupItemProps extends Assign<HTMLProps<'button'>, ToggleGroupItemBaseProps> {}

export const ToggleGroupItem = (props: ToggleGroupItemProps) => {
  const [toggleProps, restProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useToggleGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(toggleProps), restProps)

  return <ark.button {...mergedProps} state={api().getItemState(toggleProps)} />
}

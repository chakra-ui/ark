import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/toggle-group'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupItemBaseProps extends ItemProps, PolymorphicProps<'button'> {}
export interface ToggleGroupItemProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    ToggleGroupItemBaseProps {}

export const ToggleGroupItem = (props: ToggleGroupItemProps) => {
  const [toggleProps, restProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useToggleGroupContext()
  const mergedProps = mergeProps(() => api().getItemProps(toggleProps), restProps)

  return <ark.button {...mergedProps} />
}

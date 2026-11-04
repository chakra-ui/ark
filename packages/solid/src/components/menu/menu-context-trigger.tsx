import { mergeProps } from '@zag-js/solid'
import type { TriggerProps } from '@zag-js/menu'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuContextTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
export interface MenuContextTriggerProps extends Assign<HTMLProps<'button'>, MenuContextTriggerBaseProps> {}

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const [contextTriggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getContextTriggerProps(contextTriggerProps), localProps)

  return <ark.button {...mergedProps} />
}

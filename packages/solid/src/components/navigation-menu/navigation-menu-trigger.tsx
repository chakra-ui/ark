import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/navigation-menu'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'
import type { Assign } from '../../types.ts'

export interface NavigationMenuTriggerBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps<'button'> {}
export interface NavigationMenuTriggerProps extends Assign<HTMLProps<'button'>, NavigationMenuTriggerBaseProps> {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuTrigger = (props: NavigationMenuTriggerProps) => {
  const itemContext = useNavigationMenuItemPropsContext()
  if (!itemContext) {
    throw new Error('NavigationMenu.Trigger must be used within NavigationMenu.Item')
  }
  const value = createMemo(() => itemContext.value)
  const disabled = createMemo(() => props.disabled ?? itemContext.disabled)

  const combinedProps = mergeProps(props, () => ({ value: value(), disabled: disabled() }))
  const [triggerProps, localProps] = splitItemProps(combinedProps, ['value', 'disabled'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}

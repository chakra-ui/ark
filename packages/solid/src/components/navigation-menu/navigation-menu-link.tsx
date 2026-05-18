import type { LinkProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'

export interface NavigationMenuLinkBaseProps extends Partial<LinkProps>, PolymorphicProps<'a'> {}
export interface NavigationMenuLinkProps extends Assign<HTMLProps<'a'>, NavigationMenuLinkBaseProps> {}

const splitLinkProps = createSplitProps<LinkProps>()

export const NavigationMenuLink = (props: NavigationMenuLinkProps) => {
  const itemContext = useNavigationMenuItemPropsContext()
  const value = createMemo(() => props.value ?? itemContext?.value)

  const combinedProps = mergeProps(props, () => ({ value: value() }))
  const [linkProps, localProps] = splitLinkProps(combinedProps, ['current', 'onSelect', 'value', 'closeOnClick'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getLinkProps(linkProps), localProps)

  return <ark.a {...mergedProps} />
}

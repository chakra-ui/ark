import { mergeProps } from '@zag-js/react'
import type { LinkProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuContentBaseProps extends Omit<LinkProps, 'value'>, PolymorphicProps {
  value?: string
}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>((props, ref) => {
  const itemPropsContext = useNavigationMenuItemPropsContext()
  const [_contentProps, localProps] = createSplitProps<Partial<LinkProps>>()(props, ['current', 'onSelect', 'value'])
  const contentProps = { value: itemPropsContext?.value, ..._contentProps }
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getContentProps(contentProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuContent.displayName = 'NavigationMenuContent'

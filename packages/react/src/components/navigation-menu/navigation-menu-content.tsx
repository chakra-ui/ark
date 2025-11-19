import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { createSplitProps } from '../../utils/create-split-props'
import type { LinkProps } from '@zag-js/navigation-menu'

export interface NavigationMenuContentBaseProps extends LinkProps, PolymorphicProps {}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>((props, ref) => {
  const [contentProps, localProps] = createSplitProps<LinkProps>()(props, ['current', 'onSelect', 'value'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getContentProps(contentProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuContent.displayName = 'NavigationMenuContent'

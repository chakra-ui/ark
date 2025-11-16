import { mergeProps } from '@zag-js/react'
import type { ViewportProps } from '@zag-js/navigation-menu'
import { forwardRef, useEffect } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useViewportContentContext } from './navigation-menu-viewport-content-context'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuViewportBaseProps extends ViewportProps, PolymorphicProps {}
export interface NavigationMenuViewportProps extends Assign<HTMLProps<'div'>, NavigationMenuViewportBaseProps> {}

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>((props, ref) => {
  const [viewportProps, localProps] = createSplitProps<ViewportProps>()(props, ['align'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getViewportProps(viewportProps), localProps)
  const viewportContent = useViewportContentContext()

  useEffect(() => {
    if (viewportContent) {
      viewportContent.setHasViewport(true)
    }
  }, [viewportContent])

  return (
    <ark.div {...mergedProps} ref={ref}>
      {Array.from(viewportContent?.items ?? []).map(([value, children]) => {
        const contentProps = navigationMenu.getContentProps({ value })
        return (
          <ark.div key={value} {...contentProps}>
            {children}
          </ark.div>
        )
      })}
    </ark.div>
  )
})

NavigationMenuViewport.displayName = 'NavigationMenuViewport'

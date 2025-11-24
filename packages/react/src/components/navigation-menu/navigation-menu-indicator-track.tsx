import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuIndicatorTrackBaseProps extends PolymorphicProps {}
export interface NavigationMenuIndicatorTrackProps extends HTMLProps<'div'>, NavigationMenuIndicatorTrackBaseProps {}

export const NavigationMenuIndicatorTrack = forwardRef<HTMLDivElement, NavigationMenuIndicatorTrackProps>(
  (props, ref) => {
    const navigationMenu = useNavigationMenuContext()
    const mergedProps = mergeProps(navigationMenu.getIndicatorTrackProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NavigationMenuIndicatorTrack.displayName = 'NavigationMenuIndicatorTrack'

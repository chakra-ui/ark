import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuIndicatorTrackBaseProps extends PolymorphicProps<'div'> {}
export interface NavigationMenuIndicatorTrackProps extends HTMLProps<'div'>, NavigationMenuIndicatorTrackBaseProps {}

export const NavigationMenuIndicatorTrack = (props: NavigationMenuIndicatorTrackProps) => {
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getIndicatorTrackProps(), props)

  return <ark.div {...mergedProps} />
}

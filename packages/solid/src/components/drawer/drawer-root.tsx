import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { useDrawer, type UseDrawerProps } from './use-drawer'
import { DrawerProvider } from './use-drawer-context'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import { createSplitProps } from '../../utils/create-split-props'

export interface DrawerRootBaseProps extends UseDrawerProps, UsePresenceProps {}
export interface DrawerRootProps extends DrawerRootBaseProps {
  children?: JSX.Element
}

export const DrawerRoot = (props: DrawerRootProps) => {
  const [presenceProps, drawerProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const [useDrawerProps, localProps] = createSplitProps<UseDrawerProps>()(drawerProps, [
    'id',
    'ids',
    'open',
    'defaultOpen',
    'onOpenChange',
    'closeOnInteractOutside',
    'closeOnEscape',
    'snapPoints',
    'swipeDirection',
    'snapToSequentialPoints',
    'swipeVelocityThreshold',
    'closeThreshold',
    'preventDragOnScroll',
    'stack',
    'snapPoint',
    'defaultSnapPoint',
    'onSnapPointChange',
    'modal',
    'trapFocus',
    'restoreFocus',
    'preventScroll',
    'initialFocusEl',
    'finalFocusEl',
    'role',
    'onInteractOutside',
    'onEscapeKeyDown',
    'onPointerDownOutside',
    'onFocusOutside',
    'onRequestDismiss',
  ])
  const drawer = useDrawer(useDrawerProps)
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: drawer().open })))

  return (
    <DrawerProvider value={drawer}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </DrawerProvider>
  )
}

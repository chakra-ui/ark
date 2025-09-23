import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import { useBottomSheet, type UseBottomSheetProps } from './use-bottom-sheet'
import { BottomSheetProvider } from './use-bottom-sheet-context'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import { createSplitProps } from '../../utils/create-split-props'

export interface BottomSheetRootBaseProps extends UseBottomSheetProps, UsePresenceProps {}
export interface BottomSheetRootProps extends BottomSheetRootBaseProps {
  children?: JSX.Element
}

export const BottomSheetRoot = (props: BottomSheetRootProps) => {
  const [presenceProps, bottomSheetProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const [useBottomSheetProps, localProps] = createSplitProps<UseBottomSheetProps>()(bottomSheetProps, [
    'id',
    'ids',
    'open',
    'defaultOpen',
    'onOpenChange',
    'closeOnInteractOutside',
    'closeOnEscape',
    'snapPoints',
    'swipeVelocityThreshold',
    'closeThreshold',
    'preventDragOnScroll',
    'activeSnapPoint',
    'defaultActiveSnapPoint',
    'onActiveSnapPointChange',
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
  const bottomSheet = useBottomSheet(useBottomSheetProps)
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: bottomSheet().open })))

  return (
    <BottomSheetProvider value={bottomSheet}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </BottomSheetProvider>
  )
}

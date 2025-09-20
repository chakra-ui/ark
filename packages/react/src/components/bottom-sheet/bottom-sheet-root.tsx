import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { type UseBottomSheetProps, useBottomSheet } from './use-bottom-sheet'
import { BottomSheetProvider } from './use-bottom-sheet-context'

export interface BottomSheetRootBaseProps extends UseBottomSheetProps, UsePresenceProps {}
export interface BottomSheetRootProps extends BottomSheetRootBaseProps {
  children?: ReactNode | undefined
}

export const BottomSheetRoot = (props: BottomSheetRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const bottomSheet = useBottomSheet(localProps)
  const presence = usePresence(mergeProps({ present: bottomSheet.open }, presenceProps))

  return (
    <BottomSheetProvider value={bottomSheet}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </BottomSheetProvider>
  )
}

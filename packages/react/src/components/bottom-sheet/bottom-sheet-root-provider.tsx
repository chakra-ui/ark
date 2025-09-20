import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import type { PolymorphicProps } from '../factory'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import type { UseBottomSheetReturn } from './use-bottom-sheet'
import { BottomSheetProvider } from './use-bottom-sheet-context'
interface RootProviderProps {
  value: UseBottomSheetReturn
}

export interface BottomSheetRootProviderBaseProps extends RootProviderProps, UsePresenceProps, PolymorphicProps {}
export interface BottomSheetRootProviderProps extends BottomSheetRootProviderBaseProps {
  children?: ReactNode | undefined
}

export const BottomSheetRootProvider = (props: BottomSheetRootProviderProps) => {
  const [presenceProps, { value: bottomSheet, children }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const presence = usePresence(mergeProps({ present: bottomSheet.open }, presenceProps))

  return (
    <BottomSheetProvider value={bottomSheet}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </BottomSheetProvider>
  )
}

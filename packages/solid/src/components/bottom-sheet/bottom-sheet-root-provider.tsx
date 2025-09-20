import type { JSX } from 'solid-js'
import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'
import type { UseBottomSheetReturn } from './use-bottom-sheet'
import { BottomSheetProvider } from './use-bottom-sheet-context'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import { mergeProps } from '@zag-js/solid'

interface RootProviderProps {
  value: UseBottomSheetReturn
}

export interface BottomSheetRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface BottomSheetRootProviderProps extends BottomSheetRootProviderBaseProps {
  children?: JSX.Element
}

export const BottomSheetRootProvider = (props: BottomSheetRootProviderProps) => {
  const [presenceProps, bottomSheetProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const presence = usePresence(mergeProps(() => ({ present: bottomSheetProps.value().open }), presenceProps))

  return (
    <BottomSheetProvider value={bottomSheetProps.value}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{bottomSheetProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </BottomSheetProvider>
  )
}

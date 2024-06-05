import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseDialogReturn } from './use-dialog'
import { DialogProvider } from './use-dialog-context'

interface RootProviderProps {
  children?: JSX.Element
  value: UseDialogReturn
}

export interface DialogRootProviderProps extends RootProviderProps, UsePresenceProps {}

export const DialogRootProvider = (props: DialogRootProviderProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)

  const apiPresence = usePresence(
    mergeProps(presenceProps, () => ({ present: localProps.value().open })),
  )

  return (
    <DialogProvider value={localProps.value}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </DialogProvider>
  )
}

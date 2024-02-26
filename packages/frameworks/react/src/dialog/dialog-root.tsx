import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../render-strategy'
import { runIfFn } from '../run-if-fn'
import { DialogProvider } from './dialog-context'
import { useDialog, type UseDialogProps, type UseDialogReturn } from './use-dialog'

export interface DialogRootProps extends UseDialogProps, UsePresenceProps {
  children?: ReactNode | ((api: UseDialogReturn) => ReactNode)
}

export const DialogRoot = (props: DialogRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const api = useDialog(localProps)
  const presenceApi = usePresence(mergeProps({ present: api.isOpen }, presenceProps))
  const view = runIfFn(children, api)

  return (
    <DialogProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
      </RenderStrategyProvider>
    </DialogProvider>
  )
}

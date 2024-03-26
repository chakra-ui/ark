import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../render-strategy'
import { useDialog, type UseDialogProps } from './use-dialog'
import { DialogProvider } from './use-dialog-context'

export interface DialogRootProps extends UseDialogProps, UsePresenceProps {
  children?: ReactNode
}

export const DialogRoot = (props: DialogRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const context = useDialog(localProps)
  const presenceApi = usePresence(mergeProps({ present: context.isOpen }, presenceProps))

  return (
    <DialogProvider value={context}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presenceApi}>{children}</PresenceProvider>
      </RenderStrategyProvider>
    </DialogProvider>
  )
}

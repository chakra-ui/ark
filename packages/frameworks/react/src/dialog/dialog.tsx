import { mergeProps } from '@zag-js/core'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresencePropsProvider, PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { runIfFn } from '../run-if-fn'
import { DialogProvider } from './dialog-context'
import { useDialog, type UseDialogProps, type UseDialogReturn } from './use-dialog'

export interface DialogProps extends UseDialogProps, UsePresenceProps {
  children?: ReactNode | ((api: UseDialogReturn) => ReactNode)
}

export const Dialog = (props: DialogProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const api = useDialog(localProps)
  const presenceApi = usePresence(mergeProps({ present: api.isOpen }, presenceProps))
  const view = runIfFn(children, api)

  return (
    <DialogProvider value={api}>
      <PresencePropsProvider value={presenceProps}>
        <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
      </PresencePropsProvider>
    </DialogProvider>
  )
}

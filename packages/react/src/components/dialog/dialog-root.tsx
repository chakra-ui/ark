'use client'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy.ts'
import type { UsePresenceProps } from '../presence/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { splitPresenceProps } from '../presence/split-presence-props.ts'
import { type UseDialogProps, useDialog } from './use-dialog.ts'
import { DialogProvider } from './use-dialog-context.ts'

export interface DialogRootBaseProps extends UseDialogProps, UsePresenceProps {}
export interface DialogRootProps extends DialogRootBaseProps {
  children?: ReactNode | undefined
}

export const DialogRoot = (props: DialogRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const dialog = useDialog(localProps)
  const presence = usePresence(mergeProps({ present: dialog.open }, presenceProps))

  return (
    <DialogProvider value={dialog}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </DialogProvider>
  )
}

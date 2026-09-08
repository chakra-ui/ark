'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDialogContext } from './use-dialog-context.ts'
import type { PositionerState } from '@zag-js/dialog'

export interface DialogPositionerState extends PositionerState {}

export interface DialogPositionerBaseProps extends PolymorphicProps<DialogPositionerState> {}
export interface DialogPositionerProps extends HTMLProps<'div'>, DialogPositionerBaseProps {}

export const DialogPositioner = forwardRef<HTMLDivElement, DialogPositionerProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} state={dialog.getPositionerState()} />
})

DialogPositioner.displayName = 'DialogPositioner'

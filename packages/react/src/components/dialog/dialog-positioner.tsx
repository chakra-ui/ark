'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogPositionerBaseProps extends PolymorphicProps {}
export interface DialogPositionerProps extends HTMLProps<'div'>, DialogPositionerBaseProps {}

export const DialogPositioner = ({ ref, ...props }: DialogPositionerProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
}

DialogPositioner.displayName = 'DialogPositioner'

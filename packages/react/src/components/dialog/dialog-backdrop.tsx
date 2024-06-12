import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogBackdropProps extends HTMLArkProps<'div'> {}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(dialog.getBackdropProps(), presence.getPresenceProps(ref), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

DialogBackdrop.displayName = 'DialogBackdrop'

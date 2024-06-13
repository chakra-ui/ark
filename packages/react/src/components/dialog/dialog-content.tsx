import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export type DialogContentBaseProps = {}
export interface DialogContentProps extends HTMLArkProps<'div'>, DialogContentBaseProps {}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(dialog.getContentProps(), presence.getPresenceProps(ref), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

DialogContent.displayName = 'DialogContent'

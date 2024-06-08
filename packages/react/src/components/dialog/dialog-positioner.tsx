import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner = forwardRef<HTMLDivElement, DialogPositionerProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

DialogPositioner.displayName = 'DialogPositioner'

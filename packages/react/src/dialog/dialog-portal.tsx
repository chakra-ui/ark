import { Portal, PortalProps } from '@zag-js/react'
import { useDialogContext } from './dialog-context'

export type DialogPortalProps = PortalProps

export const DialogPortal = (props: DialogPortalProps) => {
  const { isOpen } = useDialogContext()

  return isOpen ? <Portal {...props} /> : null
}

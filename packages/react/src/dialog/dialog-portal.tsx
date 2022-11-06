import { Portal, PortalProps } from '@reach/portal'
import { useDialogContext } from './dialog-context'

export type DialogPortalProps = PortalProps

export const DialogPortal = (props: DialogPortalProps) => {
  const { isOpen } = useDialogContext()
  return isOpen ? <Portal type="ark-portal" {...props} /> : null
}

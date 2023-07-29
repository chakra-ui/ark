import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDialogContext } from './dialog-context'
import { DialogPresence, type DialogPresenceProps } from './dialog-presence'

export type DialogBackdropProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<DialogPresenceProps, 'children'>

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => (
  <DialogPresence>
    <InnerDialogBackdrop ref={ref} {...props} />
  </DialogPresence>
))

DialogBackdrop.displayName = 'DialogBackdrop'

const InnerDialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const { backdropProps } = useDialogContext()
  const mergedProps = mergeProps(backdropProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

InnerDialogBackdrop.displayName = 'InnerDialogBackdrop'

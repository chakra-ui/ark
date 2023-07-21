import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDialogContext } from './dialog-context'
import { DialogPresence, type DialogPresenceProps } from './dialog-presence'

export type DialogBackdropProps = HTMLArkProps<'div'> & Omit<DialogPresenceProps, 'children'>

export const DialogBackdrop = forwardRef<'div', DialogBackdropProps>((props, ref) => (
  <DialogPresence>
    <InnerDialogBackdrop ref={ref} {...props} />
  </DialogPresence>
))

const InnerDialogBackdrop = forwardRef<'div', HTMLArkProps<'div'>>((props, ref) => {
  const { backdropProps } = useDialogContext()
  const mergedProps = mergeProps(backdropProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

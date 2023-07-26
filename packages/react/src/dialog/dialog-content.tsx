import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'
import { DialogPresence, type DialogPresenceProps } from './dialog-presence'

export type DialogContentProps = HTMLArkProps<'div'> & Omit<DialogPresenceProps, 'children'>

export const DialogContent = forwardRef<'div', DialogContentProps>((props, ref) => {
  const [presenceProps, dialogContentProps] = splitPresenceProps(props)
  return (
    <DialogPresence {...presenceProps}>
      <InnerDialogContent ref={ref} {...dialogContentProps} />
    </DialogPresence>
  )
})

const InnerDialogContent = forwardRef<'div', HTMLArkProps<'div'>>((props, ref) => {
  const { contentProps } = useDialogContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'
import { DialogPresence, type DialogPresenceProps } from './dialog-presence'

export type DialogContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<DialogPresenceProps, 'children'>

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const [presenceProps, dialogContentProps] = splitPresenceProps(props)
  return (
    <DialogPresence {...presenceProps}>
      <InnerDialogContent ref={ref} {...dialogContentProps} />
    </DialogPresence>
  )
})

DialogContent.displayName = 'DialogContent'

const InnerDialogContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ark.div>>(
  (props, ref) => {
    const { contentProps } = useDialogContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

InnerDialogContent.displayName = 'InnerDialogContent'

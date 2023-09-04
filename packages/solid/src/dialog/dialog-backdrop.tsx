import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'
import { DialogPresence, type DialogPresenceProps } from './dialog-presence'

export type DialogBackdropProps = HTMLArkProps<'div'> & DialogPresenceProps

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const dialog = useDialogContext()
  const backdropProps = mergeProps(() => dialog().backdropProps, localProps)

  return (
    <DialogPresence {...presenceProps}>
      <ark.div {...backdropProps} />
    </DialogPresence>
  )
}

import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'
import { DialogPresence, type DialogPresenceProps } from './dialog-presence'

export type DialogContentProps = HTMLArkProps<'div'> & DialogPresenceProps

export const DialogContent = (props: DialogContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const dialog = useDialogContext()
  const contentProps = mergeProps(() => dialog().contentProps, localProps)

  return (
    <DialogPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </DialogPresence>
  )
}

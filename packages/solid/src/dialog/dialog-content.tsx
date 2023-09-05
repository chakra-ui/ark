import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLArkProps<'div'> & PresenceProps

export const DialogContent = (props: DialogContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useDialogContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

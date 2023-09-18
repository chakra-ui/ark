import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'

export type DialogBackdropProps = HTMLArkProps<'div'> & PresenceProps

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useDialogContext()
  const mergedProps = mergeProps(() => api().backdropProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

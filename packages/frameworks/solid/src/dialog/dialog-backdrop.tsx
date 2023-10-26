import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useDialogContext } from './dialog-context'

export interface DialogBackdropProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useDialogContext()
  const mergedProps = mergeProps(() => api().backdropProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps} fallback={<div {...api().backdropProps} />}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}

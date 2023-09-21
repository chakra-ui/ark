import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useDialogContext } from './dialog-context'

export interface DialogBackdropProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useDialogContext()

  return (
    <Presence present={api.isOpen} {...presenceProps}>
      <DialogInnerBackdrop ref={ref} {...localProps} />
    </Presence>
  )
})

DialogBackdrop.displayName = 'DialogBackdrop'

const DialogInnerBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  function DialogInnerBackdrop(props, ref) {
    const api = useDialogContext()
    const mergedProps = mergeProps(api.backdropProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

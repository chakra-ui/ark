import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useDialogContext } from './dialog-context'

export interface DialogContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useDialogContext()

  return (
    <Presence present={api.isOpen} {...presenceProps}>
      <DialogInnerContent ref={ref} {...localProps} />
    </Presence>
  )
})

DialogContent.displayName = 'DialogContent'

const DialogInnerContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogInnerContent(props, ref) {
    const api = useDialogContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

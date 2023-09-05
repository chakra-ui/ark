import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<PresenceProps, 'children'>

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

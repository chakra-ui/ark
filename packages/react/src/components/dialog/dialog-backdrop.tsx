import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogBackdropBaseProps extends PolymorphicProps {}
export interface DialogBackdropProps
  extends HTMLAttributes<HTMLDivElement>,
    DialogBackdropBaseProps {}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const dialog = useDialogContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: dialog.open })
  const mergedProps = mergeProps(dialog.getBackdropProps(), presence.getPresenceProps(ref), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

DialogBackdrop.displayName = 'DialogBackdrop'

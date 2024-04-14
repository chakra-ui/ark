import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogBackdropProps extends HTMLArkProps<'div'> {}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const dialog = useDialogContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: dialog.isOpen })
  const mergedProps = mergeProps(dialog.backdropProps, presence.getPresenceProps(ref), props)

  if (presence.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

DialogBackdrop.displayName = 'DialogBackdrop'

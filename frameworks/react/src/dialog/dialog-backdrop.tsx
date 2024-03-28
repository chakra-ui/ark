import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresence } from '../presence'
import { useRenderStrategyContext } from '../render-strategy'
import { useDialogContext } from './use-dialog-context'

export interface DialogBackdropProps extends HTMLArkProps<'div'> {}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const context = useDialogContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence({ ...renderStrategyProps, present: context.isOpen })
  const mergedProps = mergeProps(context.backdropProps, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

DialogBackdrop.displayName = 'DialogBackdrop'

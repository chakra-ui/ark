import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresence, usePresencePropsContext } from '../presence'
import { useDialogContext } from './dialog-context'

export interface DialogBackdropProps extends HTMLArkProps<'div'> {}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const api = useDialogContext()
  const presenceProps = usePresencePropsContext()
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const mergedProps = mergeProps(api.backdropProps, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

DialogBackdrop.displayName = 'DialogBackdrop'

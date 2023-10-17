import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner = forwardRef<HTMLDivElement, DialogPositionerProps>((props, ref) => {
  const api = useDialogContext()
  const mergedProps = mergeProps(api.positionerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

DialogPositioner.displayName = 'DialogPositioner'

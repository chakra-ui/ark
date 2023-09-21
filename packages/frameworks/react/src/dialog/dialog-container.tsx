import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogContainerProps extends HTMLArkProps<'div'> {}

export const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>((props, ref) => {
  const api = useDialogContext()
  const mergedProps = mergeProps(api.containerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

DialogContainer.displayName = 'DialogContainer'

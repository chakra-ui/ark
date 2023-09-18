import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContainerProps = HTMLArkProps<'div'>

export const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>((props, ref) => {
  const { containerProps } = useDialogContext()
  const mergedProps = mergeProps(containerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

DialogContainer.displayName = 'DialogContainer'

import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLArkProps<'div'>

export const DialogContent = forwardRef<'div'>((props, ref) => {
  const { contentProps } = useDialogContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

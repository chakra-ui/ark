import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContentProps = HTMLArkProps<'div'>

export const DialogContent = forwardRef<'div', DialogContentProps>((props, ref) => {
  const { contentProps } = useDialogContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

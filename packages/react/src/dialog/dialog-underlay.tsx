import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'
export type DialogUnderlayProps = HTMLArkProps<'div'>

export const DialogUnderlay = forwardRef<'div', DialogUnderlayProps>((props, ref) => {
  const { underlayProps } = useDialogContext()
  const mergedProps = mergeProps(underlayProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

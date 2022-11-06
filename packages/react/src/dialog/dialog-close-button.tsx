import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogCloseButtonProps = HTMLArkProps<'button'>

export const DialogCloseButton = forwardRef<'button', DialogCloseButtonProps>((props, ref) => {
  const { closeButtonProps } = useDialogContext()
  const mergedProps = mergeProps(closeButtonProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

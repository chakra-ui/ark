import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDialogContext } from './dialog-context'

export type DialogCloseTriggerProps = HTMLArkProps<'button'>
export const DialogCloseTrigger = forwardRef<'button'>((props, ref) => {
  const { closeTriggerProps } = useDialogContext()
  const mergedProps = mergeProps(closeTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = HTMLArkProps<'button'>

export const DialogTrigger = forwardRef<'button'>((props, ref) => {
  const { triggerProps } = useDialogContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

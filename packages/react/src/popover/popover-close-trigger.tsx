import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverCloseTriggerProps = HTMLArkProps<'button'>

export const PopoverCloseTrigger = forwardRef<'button'>((props, ref) => {
  const { closeTriggerProps } = usePopoverContext()
  const mergedProps = mergeProps(closeTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = HTMLArkProps<'button'>

export const PopoverTrigger = forwardRef<'button'>((props, ref) => {
  const { triggerProps } = usePopoverContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

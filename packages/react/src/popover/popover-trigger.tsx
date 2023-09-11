import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = HtmlArkProps<'button'>

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  const { triggerProps } = usePopoverContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

PopoverTrigger.displayName = 'PopoverTrigger'

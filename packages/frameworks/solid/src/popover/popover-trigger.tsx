import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = HTMLArkProps<'button'>

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const api = usePopoverContext()
  const triggerProps = mergeProps(() => api().triggerProps, props)
  return <ark.button {...triggerProps} />
}

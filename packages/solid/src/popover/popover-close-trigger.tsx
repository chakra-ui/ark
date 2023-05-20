import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverCloseTriggerProps = HTMLArkProps<'button'>

export const PopoverCloseTrigger = (props: PopoverCloseTriggerProps) => {
  const api = usePopoverContext()
  const triggerProps = mergeProps(() => api().closeTriggerProps, props)
  return <ark.button {...triggerProps} />
}

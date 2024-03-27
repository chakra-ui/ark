import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverCloseTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverCloseTrigger = (props: PopoverCloseTriggerProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().closeTriggerProps, props)

  return <ark.button {...mergedProps} />
}

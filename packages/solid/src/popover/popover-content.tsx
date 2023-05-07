import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = HTMLArkProps<'div'>

export const PopoverContent = (props: PopoverContentProps) => {
  const api = usePopoverContext()
  const contentProps = mergeProps(() => api().contentProps, props)
  return <ark.div {...contentProps} />
}

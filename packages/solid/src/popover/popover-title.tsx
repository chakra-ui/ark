import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLArkProps<'div'>

export const PopoverTitle = (props: PopoverTitleProps) => {
  const api = usePopoverContext()
  const titleProps = mergeProps(() => api().titleProps, props)
  return <ark.div {...titleProps} />
}

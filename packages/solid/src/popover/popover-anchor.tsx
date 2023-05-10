import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = HTMLArkProps<'div'>

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const api = usePopoverContext()
  const anchorProps = mergeProps(() => api().anchorProps, props)
  return <ark.div {...anchorProps} />
}

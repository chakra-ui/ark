import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverAnchorProps extends HTMLArkProps<'div'> {}

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().anchorProps, props)

  return <ark.div {...mergedProps} />
}

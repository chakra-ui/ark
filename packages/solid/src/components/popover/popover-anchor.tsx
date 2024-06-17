import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverAnchorBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverAnchorProps extends HTMLProps<'div'>, PopoverAnchorBaseProps {}

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getAnchorProps(), props)

  return <ark.div {...mergedProps} />
}

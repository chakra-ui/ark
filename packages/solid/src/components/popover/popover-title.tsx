import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTitleBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverTitleProps extends HTMLProps<'div'>, PopoverTitleBaseProps {}

export const PopoverTitle = (props: PopoverTitleProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getTitleProps(), props)

  return <ark.div {...mergedProps} />
}

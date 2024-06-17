import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTitleBaseProps extends PolymorphicProps<'div'> {}
export interface PopoverTitleProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    PopoverTitleBaseProps {}

export const PopoverTitle = (props: PopoverTitleProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getTitleProps(), props)

  return <ark.div {...mergedProps} />
}

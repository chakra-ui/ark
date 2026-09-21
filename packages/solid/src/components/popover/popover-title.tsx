import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface PopoverTitleProps extends HTMLProps<'h2'>, PopoverTitleBaseProps {}

export const PopoverTitle = (props: PopoverTitleProps) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().getTitleProps(), props)

  return <ark.h2 {...mergedProps} />
}

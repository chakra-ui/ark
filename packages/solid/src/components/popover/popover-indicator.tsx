import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePopoverContext } from './use-popover-context.ts'

export interface PopoverIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface PopoverIndicatorProps extends HTMLProps<'span'>, PopoverIndicatorBaseProps {}

export const PopoverIndicator = (props: PopoverIndicatorProps) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(() => popover().getIndicatorProps(), props)

  return <ark.span {...mergedProps} />
}

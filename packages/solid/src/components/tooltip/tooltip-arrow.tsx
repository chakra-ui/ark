import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowBaseProps extends PolymorphicProps<'div'> {}
export interface TooltipArrowProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    TooltipArrowBaseProps {}

export const TooltipArrow = (props: TooltipArrowProps) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(() => tooltip().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}

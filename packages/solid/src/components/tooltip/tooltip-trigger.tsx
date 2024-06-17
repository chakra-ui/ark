import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TooltipTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    TooltipTriggerBaseProps {}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}

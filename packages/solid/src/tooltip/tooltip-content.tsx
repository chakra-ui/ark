import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HTMLArkProps<'div'>

export const TooltipContent = (props: TooltipContentProps) => {
  const api = useTooltipContext()
  const contentProps = mergeProps(() => api().contentProps, props)
  return <ark.div {...contentProps} />
}

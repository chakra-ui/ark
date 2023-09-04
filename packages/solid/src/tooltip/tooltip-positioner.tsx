import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLArkProps<'div'>

export const TooltipPositioner = (props: TooltipPositionerProps) => {
  const api = useTooltipContext()
  const positionerProps = mergeProps(() => api().positionerProps, props)

  return <ark.div {...positionerProps} />
}

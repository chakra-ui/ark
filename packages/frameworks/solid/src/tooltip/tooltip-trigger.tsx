import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipTriggerProps extends HTMLArkProps<'button'> {}

export const TooltipTrigger: ArkComponent<'button'> = (props) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().triggerProps, props)

  return <ark.button {...mergedProps} />
}

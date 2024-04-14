import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleTriggerProps extends HTMLArkProps<'button'> {}

export const CollapsibleTrigger = (props: CollapsibleTriggerProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().triggerProps, props)
  return <ark.button {...mergedProps} />
}

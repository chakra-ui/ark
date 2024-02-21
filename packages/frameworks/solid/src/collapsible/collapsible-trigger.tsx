import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useCollapsibleContext } from './collapsible-context'

export interface CollapsibleTriggerProps extends HTMLArkProps<'button'> {}

export const CollapsibleTrigger: ArkComponent<'button'> = (props: CollapsibleTriggerProps) => {
  const api = useCollapsibleContext()
  const mergedProps = () => mergeProps(api().triggerProps, props)

  return <ark.button {...mergedProps}>{props.children}</ark.button>
}

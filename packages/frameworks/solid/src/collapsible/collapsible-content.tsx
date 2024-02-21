import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useCollapsibleContext } from './collapsible-context'

export interface CollapsibleContentProps extends HTMLArkProps<'div'> {}

export const CollapsibleContent: ArkComponent<'div'> = (props: CollapsibleContentProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().contentProps, props)

  return <ark.div {...mergedProps} />
}

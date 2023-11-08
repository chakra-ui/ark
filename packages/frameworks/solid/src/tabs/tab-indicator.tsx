import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export interface TabIndicatorProps extends HTMLArkProps<'div'> {}

export const TabIndicator = (props: TabIndicatorProps) => {
  const api = useTabsContext()
  const indicatorProps = mergeProps(() => api().indicatorProps, props)
  return <ark.div {...indicatorProps} />
}

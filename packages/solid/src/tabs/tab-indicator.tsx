import { mergeProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HTMLArkProps<'div'>

export const TabIndicator = (props: TabIndicatorProps) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs().indicatorProps, props)

  return <ark.div {...mergedProps} />
}

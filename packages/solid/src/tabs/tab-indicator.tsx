import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HTMLArkProps<'div'>

export const TabIndicator = (props: TabIndicatorProps) => {
  const tabs = useTabsContext()

  return <ark.div {...tabs().indicatorProps} {...props} />
}

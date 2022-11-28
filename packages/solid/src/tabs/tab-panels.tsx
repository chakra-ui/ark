import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabPanelsProps = HTMLArkProps<'div'>

export const TabPanels = (props: TabPanelsProps) => {
  const tabs = useTabsContext()

  return <ark.div {...tabs().contentGroupProps} {...props} />
}

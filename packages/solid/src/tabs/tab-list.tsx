import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLArkProps<'div'>

export const TabList = (props: TabListProps) => {
  const tabs = useTabsContext()

  return <ark.div {...tabs().tablistProps} {...props} />
}

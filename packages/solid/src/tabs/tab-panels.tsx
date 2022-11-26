import { mergeProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabPanelsProps = HTMLArkProps<'div'>

export const TabPanels = (props: TabPanelsProps) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs().contentGroupProps, props)

  return <ark.div {...mergedProps} />
}

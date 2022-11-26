import { mergeProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLArkProps<'div'>

export const TabList = (props: TabListProps) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs().triggerGroupProps, props)

  return <ark.div {...mergedProps} />
}

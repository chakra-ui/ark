import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLArkProps<'div'>

export const TabList = (props: TabListProps) => {
  const api = useTabsContext()
  const tablistProps = mergeProps(() => api().tablistProps, props)
  return <ark.div {...tablistProps} />
}

import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export interface TabListProps extends HTMLArkProps<'div'> {}

export const TabList = (props: TabListProps) => {
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().listProps, props)

  return <ark.div {...mergedProps} />
}

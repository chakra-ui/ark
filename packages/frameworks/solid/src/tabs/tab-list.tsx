import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export interface TabListProps extends HTMLArkProps<'div'> {}

export const TabList: ArkComponent<'div'> = (props) => {
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().tablistProps, props)

  return <ark.div {...mergedProps} />
}

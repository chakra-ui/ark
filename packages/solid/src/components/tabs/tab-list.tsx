import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabListProps extends HTMLArkProps<'div'> {}

export const TabList = (props: TabListProps) => {
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getListProps(), props)

  return <ark.div {...mergedProps} />
}

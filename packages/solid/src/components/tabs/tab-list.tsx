import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabListBaseProps extends PolymorphicProps<'div'> {}
export interface TabListProps extends HTMLProps<'div'>, TabListBaseProps {}

export const TabList = (props: TabListProps) => {
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getListProps(), props)

  return <ark.div {...mergedProps} />
}

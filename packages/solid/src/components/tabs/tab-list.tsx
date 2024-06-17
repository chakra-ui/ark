import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabListBaseProps extends PolymorphicProps<'div'> {}
export interface TabListProps extends JSX.HTMLAttributes<HTMLDivElement>, TabListBaseProps {}

export const TabList = (props: TabListProps) => {
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getListProps(), props)

  return <ark.div {...mergedProps} />
}

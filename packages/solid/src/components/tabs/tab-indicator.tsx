import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface TabIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    TabIndicatorBaseProps {}

export const TabIndicator = (props: TabIndicatorProps) => {
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}

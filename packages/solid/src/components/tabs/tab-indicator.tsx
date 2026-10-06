import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTabsContext } from './use-tabs-context.ts'

export interface TabIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface TabIndicatorProps extends HTMLProps<'span'>, TabIndicatorBaseProps {}

export const TabIndicator = (props: TabIndicatorProps) => {
  const api = useTabsContext()
  const mergedProps = mergeProps(() => api().getIndicatorProps(), props)

  return <ark.span {...mergedProps} />
}

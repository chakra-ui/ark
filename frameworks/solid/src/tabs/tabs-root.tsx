import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  RenderStrategyProvider,
  splitRenderStrategyProps,
  type RenderStrategyProps,
} from '../render-strategy'
import type { Assign } from '../types'
import { useTabs, type UseTabsProps } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

export interface TabsRootProps
  extends Assign<HTMLArkProps<'div'>, UseTabsProps>,
    RenderStrategyProps {}

export const TabsRoot = (props: TabsRootProps) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [tabsParams, restProps] = createSplitProps<UseTabsProps>()(tabsProps, [
    'activationMode',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'loop',
    'onFocusChange',
    'onValueChange',
    'orientation',
    'translations',
    'value',
  ])

  const api = useTabs(tabsParams)
  const mergedProps = mergeProps(() => api().rootProps, restProps)

  return (
    <TabsProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps()} />
      </RenderStrategyProvider>
    </TabsProvider>
  )
}

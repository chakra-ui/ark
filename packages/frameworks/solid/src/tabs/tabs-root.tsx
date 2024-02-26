import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import {
  RenderStrategyProvider,
  splitRenderStrategyProps,
  type RenderStrategyProps,
} from '../render-strategy'
import type { Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

interface ElementProps extends UseTabsProps, RenderStrategyProps {}
export interface TabsRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

export const TabsRoot: ArkComponent<'div', TabsRootProps> = (props: TabsRootProps) => {
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
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </TabsProvider>
  )
}

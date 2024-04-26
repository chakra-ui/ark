import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { type UseTabsProps, useTabs } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

export interface TabsRootProps
  extends Assign<HTMLArkProps<'div'>, UseTabsProps>,
    RenderStrategyProps {}

export const TabsRoot = (props: TabsRootProps) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [useTabsProps, restProps] = createSplitProps<UseTabsProps>()(tabsProps, [
    'activationMode',
    'id',
    'ids',
    'loopFocus',
    'onFocusChange',
    'onValueChange',
    'orientation',
    'translations',
    'value',
  ])

  const api = useTabs(useTabsProps)
  const mergedProps = mergeProps(() => api().rootProps, restProps)

  return (
    <TabsProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </TabsProvider>
  )
}

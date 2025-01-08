import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTabsProps, useTabs } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

export interface TabsRootBaseProps
  extends UseTabsProps,
    RenderStrategyProps,
    PolymorphicProps<'div'> {}
export interface TabsRootProps extends HTMLProps<'div'>, TabsRootBaseProps {}

export const TabsRoot = (props: TabsRootProps) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [useTabsProps, restProps] = createSplitProps<UseTabsProps>()(tabsProps, [
    'activationMode',
    'composite',
    'defaultValue',
    'deselectable',
    'id',
    'ids',
    'loopFocus',
    'navigate',
    'onFocusChange',
    'onValueChange',
    'orientation',
    'translations',
    'value',
  ])

  const api = useTabs(useTabsProps)
  const mergedProps = mergeProps(() => api().getRootProps(), restProps)

  return (
    <TabsProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </TabsProvider>
  )
}

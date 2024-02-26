import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import {
  RenderStrategyProvider,
  splitRenderStrategyProps,
  type RenderStrategyProps,
} from '../render-strategy'
import { type Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

export interface TabsRootProps
  extends Assign<HTMLArkProps<'div'>, UseTabsProps>,
    RenderStrategyProps {}

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>((props, ref) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [useTabsProps, localprops] = createSplitProps<UseTabsProps>()(tabsProps, [
    'activationMode',
    'defaultValue',
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
  const api = useTabs(useTabsProps)
  const mergedProps = mergeProps(api.rootProps, localprops)

  return (
    <TabsProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyProvider>
    </TabsProvider>
  )
})

TabsRoot.displayName = 'TabsRoot'

import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import type { UseTabsReturn } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

interface RootProviderProps {
  value: UseTabsReturn
}

export interface TabsRootProviderProps
  extends HTMLArkProps<'div'>,
    RootProviderProps,
    RenderStrategyProps {}

export const TabsRootProvider = (props: TabsRootProviderProps) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [{ value: tabs }, localprops] = createSplitProps<RootProviderProps>()(tabsProps, ['value'])
  const mergedProps = mergeProps(() => tabs().getRootProps(), localprops)

  return (
    <TabsProvider value={tabs}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </TabsProvider>
  )
}

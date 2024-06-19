import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseTabsReturn } from './use-tabs'
import { TabsProvider } from './use-tabs-context'

interface RootProviderProps {
  value: UseTabsReturn
}

export interface TabsRootProviderBaseProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps {}
export interface TabsRootProviderProps extends HTMLProps<'div'>, TabsRootProviderBaseProps {}

export const TabsRootProvider = forwardRef<HTMLDivElement, TabsRootProviderProps>((props, ref) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [{ value: tabs }, localprops] = createSplitProps<RootProviderProps>()(tabsProps, ['value'])
  const mergedProps = mergeProps(tabs.getRootProps(), localprops)

  return (
    <TabsProvider value={tabs}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TabsProvider>
  )
})

TabsRootProvider.displayName = 'TabsRootProvider'

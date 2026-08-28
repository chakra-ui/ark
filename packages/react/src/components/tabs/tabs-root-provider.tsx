'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseTabsReturn } from './use-tabs.ts'
import { TabsProvider } from './use-tabs-context.ts'

interface RootProviderProps {
  value: UseTabsReturn
}

export interface TabsRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface TabsRootProviderProps extends HTMLProps<'div'>, TabsRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const TabsRootProvider = forwardRef<HTMLDivElement, TabsRootProviderProps>((props, ref) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [{ value: tabs }, localProps] = splitRootProviderProps(tabsProps, ['value'])
  const mergedProps = mergeProps(tabs.getRootProps(), localProps)

  return (
    <TabsProvider value={tabs}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TabsProvider>
  )
})

TabsRootProvider.displayName = 'TabsRootProvider'

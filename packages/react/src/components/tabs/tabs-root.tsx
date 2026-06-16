'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseTabsProps, useTabs } from './use-tabs.ts'
import { TabsProvider } from './use-tabs-context.ts'

export interface TabsRootBaseProps extends UseTabsProps, RenderStrategyProps, PolymorphicProps {}
export interface TabsRootProps extends Assign<HTMLProps<'div'>, TabsRootBaseProps> {}

const splitRootProps = createSplitProps<UseTabsProps>()

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>((props, ref) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [useTabsProps, localProps] = splitRootProps(tabsProps, [
    'activationMode',
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
    'virtualFocus',
  ])
  const tabs = useTabs(useTabsProps)
  const mergedProps = mergeProps(tabs.getRootProps(), localProps)

  return (
    <TabsProvider value={tabs}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TabsProvider>
  )
})

TabsRoot.displayName = 'TabsRoot'

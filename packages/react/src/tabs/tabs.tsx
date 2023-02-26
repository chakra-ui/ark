import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { useTabs, UseTabsProps } from './use-tabs'

export type TabsProps = Assign<HTMLArkProps<'div'>, UseTabsProps>

export const Tabs = forwardRef<'div', TabsProps>((props, ref) => {
  const [useTabsProps, divProps] = createSplitProps<UseTabsProps>()(props, [
    'activationMode',
    'defaultValue',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'loop',
    'onChange',
    'onDelete',
    'onFocus',
    'orientation',
    'translations',
    'value',
  ])
  const tabs = useTabs(useTabsProps)
  const mergedProps = mergeProps(tabs.rootProps, divProps)

  return (
    <TabsProvider value={tabs}>
      <ark.div {...mergedProps} ref={ref} />
    </TabsProvider>
  )
})

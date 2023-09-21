import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

export interface TabsProps extends Assign<HTMLArkProps<'div'>, UseTabsProps> {}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const [useTabsProps, divProps] = createSplitProps<UseTabsProps>()(props, [
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
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <TabsProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </TabsProvider>
  )
})

Tabs.displayName = 'Tabs'

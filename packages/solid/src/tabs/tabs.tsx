import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

export type TabsProps = Assign<HTMLArkProps<'div'>, UseTabsProps>

export const Tabs = (props: TabsProps) => {
  const [tabsParams, restProps] = createSplitProps<UseTabsProps>()(props, [
    'activationMode',
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

  const api = useTabs(tabsParams)
  const rootProps = mergeProps(() => api().rootProps, restProps)

  return (
    <TabsProvider value={api}>
      <ark.div {...rootProps} />
    </TabsProvider>
  )
}

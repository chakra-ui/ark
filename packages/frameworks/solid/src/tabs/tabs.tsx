import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { PresencePropsProvider, splitPresenceProps, type UsePresenceProps } from '../presence'
import type { Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

export interface TabsProps extends Assign<HTMLArkProps<'div'>, UseTabsProps>, UsePresenceProps {}

export const Tabs = (props: TabsProps) => {
  const [presenceProps, tabsProps] = splitPresenceProps(props)
  const [tabsParams, restProps] = createSplitProps<UseTabsProps>()(tabsProps, [
    'activationMode',
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

  const api = useTabs(tabsParams)
  const mergedProps = mergeProps(() => api().rootProps, restProps)

  return (
    <TabsProvider value={api}>
      <PresencePropsProvider value={presenceProps}>
        <ark.div {...mergedProps} />
      </PresencePropsProvider>
    </TabsProvider>
  )
}

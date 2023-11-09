import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { PresencePropsProvider, splitPresenceProps, type UsePresenceProps } from '../presence'
import { type Assign } from '../types'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

export interface TabsProps extends Assign<HTMLArkProps<'div'>, UseTabsProps>, UsePresenceProps {}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const [presenceProps, tabsProps] = splitPresenceProps(props)
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
      <PresencePropsProvider value={presenceProps}>
        <ark.div {...mergedProps} ref={ref} />
      </PresencePropsProvider>
    </TabsProvider>
  )
})

Tabs.displayName = 'Tabs'

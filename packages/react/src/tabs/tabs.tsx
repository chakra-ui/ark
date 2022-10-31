import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { Assign, splitProps } from '../split-props'
import { TabsProvider } from './tabs-context'
import { useTabs, UseTabsProps } from './use-tabs'

export type TabsProps = Assign<HTMLAtlasProps<'div'>, UseTabsProps>

export const Tabs = forwardRef<'div', TabsProps>((props, ref) => {
  const [tabsProps, htmlProps] = splitProps(props, [
    'activationMode',
    'dir',
    'getRootNode',
    'ids',
    'isIndicatorRendered',
    'loop',
    'onChange',
    'onDelete',
    'onFocus',
    'orientation',
    'translations',
    'value',
  ])

  const api = useTabs(tabsProps)
  return (
    <TabsProvider value={api}>
      <atlas.div {...htmlProps} {...api.rootProps} ref={ref} />
    </TabsProvider>
  )
})

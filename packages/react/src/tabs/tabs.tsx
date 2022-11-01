import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
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

  const tabs = useTabs(tabsProps)
  return (
    <TabsProvider value={tabs}>
      <atlas.div {...tabs.rootProps} {...htmlProps} ref={ref} />
    </TabsProvider>
  )
})

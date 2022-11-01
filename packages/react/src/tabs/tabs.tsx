import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { TabsProvider } from './tabs-context'
import { useTabs, UseTabsProps } from './use-tabs'

export type TabsProps = Assign<HTMLAtlasProps<'div'>, UseTabsProps>

export const Tabs = forwardRef<'div', TabsProps>((props, ref) => {
  const [useTabsProps, rootProps] = splitProps(props, [
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
  const tabs = useTabs(useTabsProps)

  return (
    <TabsProvider value={tabs}>
      <atlas.div {...tabs.rootProps} {...rootProps} ref={ref} />
    </TabsProvider>
  )
})

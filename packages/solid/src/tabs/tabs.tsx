import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { TabsProvider } from './tabs-context'
import { useTabs, UseTabsProps } from './use-tabs'

export type TabsProps = Assign<HTMLArkProps<'div'>, UseTabsProps>

export const Tabs = (props: TabsProps) => {
  const [useTabsProps, divProps] = splitProps(props, [
    'activationMode',
    'defaultValue',
    'dir',
    'getRootNode',
    'id',
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
      <ark.div {...tabs().rootProps} {...divProps} />
    </TabsProvider>
  )
}

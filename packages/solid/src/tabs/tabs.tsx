import { type Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

export type TabsProps = Assign<HTMLArkProps<'div'>, UseTabsProps>

export const Tabs = (props: TabsProps) => {
  const [useTabsProps, divProps] = createSplitProps<UseTabsProps>()(props, [
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
  const tabs = useTabs(useTabsProps)

  return (
    <TabsProvider value={tabs}>
      <ark.div {...tabs().rootProps} {...divProps} />
    </TabsProvider>
  )
}

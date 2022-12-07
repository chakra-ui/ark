import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/tabs'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

type GetContentPropsArgs = Parameters<ReturnType<typeof connect>['getContentProps']>[0]

export type TabContentProps = Assign<HTMLArkProps<'div'>, GetContentPropsArgs>

export const TabContent = (props: TabContentProps) => {
  const [tabContentProps, divProps] = createSplitProps<GetContentPropsArgs>()(props, ['value'])
  const tabs = useTabsContext()

  return <ark.div {...tabs().getContentProps(tabContentProps)} {...divProps} />
}

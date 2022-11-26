import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/tabs'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

type GetContentProps = Parameters<ReturnType<typeof connect>['getContentProps']>[0]

export type TabPanelProps = Assign<HTMLArkProps<'div'>, GetContentProps>

export const TabPanel = (props: TabPanelProps) => {
  const [tabContentProps, divProps] = splitProps(props, ['value'])
  const tabs = useTabsContext()

  return <ark.div {...tabs().getContentProps(tabContentProps)} {...divProps} />
}

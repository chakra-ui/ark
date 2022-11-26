import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/tabs'
import { mergeProps, splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

type GetContentProps = Parameters<ReturnType<typeof connect>['getContentProps']>[0]

export type TabPanelProps = Assign<HTMLArkProps<'div'>, GetContentProps>

export const TabPanel = (props: TabPanelProps) => {
  const [tabContentProps, divProps] = splitProps(props, ['value'])
  console.log(tabContentProps)
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs().getContentProps(tabContentProps), divProps)

  return <ark.div {...mergedProps} />
}

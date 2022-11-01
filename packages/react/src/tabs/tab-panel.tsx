import { forwardRef } from '@polymorphic-factory/react'
import type { connect } from '@zag-js/tabs'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { useTabsContext } from './tabs-context'

export type TabPanelProps = Assign<
  HTMLAtlasProps<'div'>,
  Parameters<ReturnType<typeof connect>['getContentProps']>[0]
>

export const TabPanel = forwardRef<'div', TabPanelProps>((props, ref) => {
  const [tabContentProps, rootProps] = splitProps(props, ['value'])
  const { getContentProps } = useTabsContext()

  return <atlas.div {...getContentProps(tabContentProps)} {...rootProps} ref={ref} />
})

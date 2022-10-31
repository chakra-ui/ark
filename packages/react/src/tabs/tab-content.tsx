import type { connect } from '@zag-js/tabs'
import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { splitProps, type Assign } from '../split-props'
import { useTabsContext } from './tabs-context'

export type TabContentProps = Assign<
  HTMLAtlasProps<'div'>,
  Parameters<ReturnType<typeof connect>['getContentProps']>[0]
>

export const TabContent = forwardRef<'div', TabContentProps>((props, ref) => {
  const [tabContentProps, htmlProps] = splitProps(props, ['value'])
  const { getContentProps } = useTabsContext()

  return <atlas.div {...htmlProps} {...getContentProps(tabContentProps)} ref={ref} />
})

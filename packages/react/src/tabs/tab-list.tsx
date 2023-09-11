import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HtmlArkProps<'div'>

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { tablistProps } = useTabsContext()
  const mergedProps = mergeProps(tablistProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'

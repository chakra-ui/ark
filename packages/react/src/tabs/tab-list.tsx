import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLArkProps<'div'>

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { tablistProps } = useTabsContext()
  const mergedProps = mergeProps(tablistProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'

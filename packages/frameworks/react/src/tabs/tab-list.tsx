import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabListProps extends HTMLArkProps<'div'> {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const context = useTabsContext()
  const mergedProps = mergeProps(context.tablistProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'

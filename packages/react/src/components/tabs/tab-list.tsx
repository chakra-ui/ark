import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabListProps extends HTMLArkProps<'div'> {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'

import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabListBaseProps extends PolymorphicProps {}
export interface TabListProps extends HTMLAttributes<HTMLDivElement>, TabListBaseProps {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'

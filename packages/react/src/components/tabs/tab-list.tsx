import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabListBaseProps extends PolymorphicProps {}
export interface TabListProps extends HTMLProps<'div'>, TabListBaseProps {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'

'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTabsContext } from './use-tabs-context'

export interface TabIndicatorBaseProps extends PolymorphicProps {}
export interface TabIndicatorProps extends HTMLProps<'div'>, TabIndicatorBaseProps {}

export const TabIndicator = ({ ref, ...props }: TabIndicatorProps) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TabIndicator.displayName = 'TabIndicator'
